const STREAM_KEY = 'new_order';
const GROUP_NAME = 'order_group';
const CONSUMER_NAME = 'pricing_service';
export class EventQueue {
    constructor(eventSource) {
        this.eventSource = eventSource;
    }
    publish(message) {
        return this.eventSource.publish("processed-order", message);
    }
    subscribe(callback) {
        this.eventSource.subscribe("buy-orders", (err, count) => {

        });
        this.eventSource.on("message", (channel, message) => {
            // send message to callback if it is in correct channel
            if (channel == "buy-orders")
                callback(message);
        });
    }



    // Ensure stream and group exist
    async initStream() {
        try {
            await this.eventSource.xGroupCreate(STREAM_KEY, GROUP_NAME, '0', { MKSTREAM: true });
            console.log('Stream group created');
        } catch (e) {
            if (!e.message.includes('BUSYGROUP')) throw e;
        }
    }

    // Publish event to stream
    async publishEvent(eventData) {
        // const args = [];
        // for (const [key, value] of Object.entries(eventData)) {
        //     args.push(key, value);
        // }
        const data = JSON.stringify(eventData);
        const id = await this.eventSource.xAdd(STREAM_KEY, '*', { data });
        return id;
    }

    // Consume events from stream
    async consumeEvent(handlerFn) {
        while (true) {
            const messages = await this.eventSource.xReadGroup(
                GROUP_NAME,
                CONSUMER_NAME,
                [{ key: STREAM_KEY, id: '>' }],
                { COUNT: 10, BLOCK: 5000 }
            );
            if (messages) {
                for (const msg of messages[0].messages) {
                    try {
                        await handlerFn(msg.message);
                        await this.eventSource.xAck(STREAM_KEY, GROUP_NAME, msg.id);
                        console.log("acked***********", msg.id);
                    } catch (err) {
                        console.error('Error processing message', msg.id, err);
                    }
                }
            }
        }
    }
}