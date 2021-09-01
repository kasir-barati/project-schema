import { chan, queue } from '../commons/configs/rabitmq.config';
import { logger } from '../commons/utils/winston.util.common';

export const publishToQueue = async (
    queueName: string,
    data: any,
) => {
    logger.info(`[AMQP] message sent to ${queue}: `, {
        meta: { data },
    });
    chan.sendToQueue(queueName, Buffer.from(data), {
        persistent: true,
    });
};
