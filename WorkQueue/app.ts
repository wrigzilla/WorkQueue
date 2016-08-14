window.onload = () =>
{
	var priority = new Work.Priority()
	var fifo = new Work.FirstInFirstOut()
	var filo = new Work.FirstInLastOut()

	var s = new Work.Queue(new Work.PrintItems(), priority);


	class PriorityItem implements Work.IQueuePriorityItem
	{
		constructor(
			public priority: number = 0,
			public name: string = ''
		)
		{ }
	}

	class Item implements Work.IQueueItem
	{
		constructor(
			public value: number = 0
		)
		{ }
	}

	var b = [
		new PriorityItem(1, ""),
		new PriorityItem(2, ""),
		new PriorityItem(7, ""),
		new PriorityItem(5, ""),
		new PriorityItem(6, ""),
		new PriorityItem(4, ""),
		new PriorityItem(5, "")
	];

	var a = [
		new Item(1),
		new Item(2),
		new Item(10),
		new Item(5),
		new Item(2),
		new Item(7),
		new Item(20),
	];


	b.forEach((x) =>
	{
		s.addItem(x);
		s.qlength();
	});
};