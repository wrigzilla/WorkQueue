module Work
{
	export interface IQueueItemWorkStratey
	{
		process(item: IQueueItem): void;
	}




	export class PrintItems implements IQueueItemWorkStratey
	{
		constructor()
		{ }

		public process(item: IQueueItem): void
		{
			console.log(item);
		}
	}
}