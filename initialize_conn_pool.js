export async function initialize_conn_pool() {
    for (let i = conn_pool.length; i < pool_size; i++) {
      const connection = await create_connection();
      conn_pool.push(connection);
   }
    HMIRuntime.Trace(`initialized ${conn_pool.length} connections`);
  }