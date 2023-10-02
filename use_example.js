export async function db_request(data) {
    let connection = await get_conn();
    try {
        let query = `SELECT * FROM MY_TABLE WHERE MY_DATA = '${data}');`;  
        let results = await connection.Execute(query);
        release_connection(connection);
        //manage result
        if(results !== undefined && results !== null){
            let statements = results.Results;
            for(let statement in statements){
                let rows = statements[statement].Rows;
                for (let i in rows){
                    let row = rows[i];
                    for(let key in row){
                        HMIRuntime.Tags(`my_plc_tag.${key}`).Write(row[key]);
                    }
                }
            }
        }
        }catch (e) {
          let res = e.Results;
          for(let statement in res){
            let errors = res[statement].Errors;
            for (let i in errors){
              let detailed = errors[i];
              //Prerequisites for CreateSystemAlarm multilingual implementation:
              //Create the text list "System_Alarm_RT" with the following entry:
              //Value: 1
              //Text: Parameter value 1: @1%s@
              let value = 1; // the value in the text list
              HMIRuntime.Alarming.SysFct.CreateSystemAlarm(
                HMIRuntime.Resources.TextLists("@Default.System_Alarm_RT").Item(value), //Reference to alarm text list
                "communication_manager.db_request()", //Alarm Area
                `${detailed.Message}` // Alarm text
              );
            }
          }
       }
    }