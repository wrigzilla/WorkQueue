module Work
{
	export interface IQueueItem
	{	}

	

	export class Queue
	{
		constructor(
			private workStrategy: IQueueItemWorkStratey,
			private addItemStrategy: IQueueAddItemStrategy,
			private currentItem: IQueueItem = null,
			private queue: IQueueItem[] = [],
			private interval: number = 500,
			private length: number = 0
		)
		{ }

		public nextItem(): void
		{
			if (this.length === 0)
			{
				console.log("*** QUEUE FINISHED");
				return;
			}
			if (this.currentItem !== null)
			{
				console.log("*** await process end");
			}
			else
			{
				this.currentItem = this.queue.shift();
				this.workStrategy.process(this.currentItem);
				this.length--;
				this.currentItem = null;
			}
			setTimeout(() => { this.nextItem(); }, this.interval);
		}

		public addItem(item: IQueueItem): void
		{
			this.queue = this.addItemStrategy.add(item, this.queue);
			this.length++;
			console.log(this.queue);
		}

		public qlength(): void
		{
			console.log("&& queue length", this.queue.length, this.queue.slice(0, this.queue.length));
		}
	}
}