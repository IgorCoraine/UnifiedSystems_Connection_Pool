export async function get_conn() {
    if (conn_pool.length > 0) {
      let connection = conn_pool.pop();
      return connection;
    }else {
      let connection = await create_connection();
      return connection;
    }
}