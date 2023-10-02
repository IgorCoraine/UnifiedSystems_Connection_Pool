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
              HMIRuntime.Alarming.SysFct.CreateSystemAlarm(
                HMIRuntime.Resources.TextLists("@Default.System_Alarm_RT").Item(value), //Reference to alarm text list
                "communication_manager.create_connection()", //Alarm Area
                `${detailed.Message}` // Alarm text
              );
        }
      }
    }
}