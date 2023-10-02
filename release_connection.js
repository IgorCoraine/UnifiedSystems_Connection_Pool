export function release_connection(connection) {
    if (conn_pool.length < pool_size){
      conn_pool.push(connection);
    }else{
      connection.Close();
    }
  }