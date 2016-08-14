module Work
{
	export interface IQueueAddItemStrategy
	{
		add(item: IQueueItem, queue: IQueueItem[]): IQueueItem[]
	}



	export class FirstInFirstOut implements IQueueAddItemStrategy
	{
		constructor()
		{ }

		public add(item: IQueueItem, queue: IQueueItem[]): IQueueItem[]
		{
			queue.push(item);
			return queue;
		}
	}



	export class FirstInLastOut implements IQueueAddItemStrategy
	{
		constructor()
		{ }

		public add(item: IQueueItem, queue: IQueueItem[]): IQueueItem[]
		{
			queue.unshift(item);
			return queue;
		}
	}



	export interface IQueuePriorityItem extends IQueueItem
	{
		priority: number;
	}

	export class Priority implements IQueueAddItemStrategy
	{
		private it: number = 0;

		constructor() { }

		public add(item: IQueuePriorityItem, queue: IQueuePriorityItem[]): IQueuePriorityItem[]
		{
			var length: number = queue.length;
			if (length === 0)
			{
				queue.push(item);
				return queue;
			}

			var currentIndex: number = 0;
			while (currentIndex < length)
			{
				if (queue[length - 1].priority >= item.priority)
				{
					queue.push(item);
					return queue;
				}
				if (queue[0].priority < item.priority)
				{
					queue.unshift(item);
					return queue;
				}

				if ((queue[currentIndex].priority > item.priority) && (queue[currentIndex + 1].priority <= item.priority))
				{
					var queueCopy = queue.slice(0, length);	//copy queue
					var highPriority = queueCopy.splice(0, currentIndex + 1);
					highPriority.push(item);
					var lowPriority = queueCopy;

					return highPriority.concat(lowPriority);
				}
				currentIndex++
			}
		}
	}
}
