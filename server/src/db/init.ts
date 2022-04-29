import sequelizeConnection from './config';
import { Product, ProductInput } from './models';
import { isDev } from '../utils/misc';
import dbtestdata from './db.test.json'; // @TODO dynamic import?

const dbInit = async() => {

  /**
   * create tables in the database if tables doesn't exist
   * @see https://sequelize.org/docs/v6/core-concepts/model-basics/#synchronizing-all-models-at-once
   * @see https://stackoverflow.com/questions/24420800/how-to-deal-with-calling-sequelize-sync-first
   */
  await sequelizeConnection.sync({ alter: isDev() });

  // load test data
  //if (isDev()) {
    dbtestdata.forEach(async(data:ProductInput) => {
      await Product.create(data);
    });
  //}
  

};

export default dbInit;
