export async function create_connection() {
    try{
      let connection = await HMIRuntime.Database.CreateConnection(connection_string);
      conn_count++;
      return connection;
    }
    catch(e){
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
                "communication_manager.create_connection()", //Alarm Area
                `${detailed.Message}` // Alarm text
              );
        }
      }
    }
}