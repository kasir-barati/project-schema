import amqp from 'amqplib/callback_api';
import { Channel, Connection } from 'amqplib';

import { logger } from '../utils/winston.util.common';

let amqpConnection: Connection;

export let chan: Channel;

export const queue = 'sendsms';

export const connectToRabitMq = () => {
    amqp.connect(
        'amqp://admin:rabbiadmin@rabbitmq',
        (error, connection) => {
            if (error) {
                logger.error('[AMQP] error in connection', {
                    meta: error,
                });
            } else {
                logger.info('[AMQP] rabbitMq connected successfully');
                amqpConnection = connection;
                connection.createChannel((error, channel) => {
                    if (error) {
                        logger.error(
                            '[AMQP] error in create channel: ',
                            {
                                meta: error,
                            },
                        );
                    } else {
                        logger.info(
                            '[AMQP] rabbitMq channel created successfully',
                        );
                        channel.assertQueue(queue, {
                            durable: false,
                        });
                        chan = channel;
                    }
                });
            }
        },
    );
};
