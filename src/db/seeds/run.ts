import { configService } from '../../config/config.service';
import { seeds } from './data';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Logger } from '@nestjs/common';
export async function insertSeeds() {
  let connection: Connection;
  try {
    connection = await createConnection(configService.getTypeOrmConfig() as ConnectionOptions)
  }
  catch(e) {
    Logger.log(`DB Connection Error, ${e}`);
  }

  try {
    const responses = await Promise.all(
      seeds.map(async (Seed) => {
        const seedInstance = new Seed();

        return seedInstance.run(connection);
      }),
    );

    Logger.log('success');
  } catch (error) {
    Logger.log({
      status: 'failed',
      message: 'Seeds inserting error',
      data: error,
    });
  }
}

insertSeeds();
