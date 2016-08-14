window.onload = function () {
    var priority = new Work.Priority();
    var fifo = new Work.FirstInFirstOut();
    var filo = new Work.FirstInLastOut();
    var s = new Work.Queue(new Work.PrintItems(), priority);
    var PriorityItem = (function () {
        function PriorityItem(priority, name) {
            if (priority === void 0) { priority = 0; }
            if (name === void 0) { name = ''; }
            this.priority = priority;
            this.name = name;
        }
        return PriorityItem;
    }());
    var Item = (function () {
        function Item(value) {
            if (value === void 0) { value = 0; }
            this.value = value;
        }
        return Item;
    }());
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
    b.forEach(function (x) {
        s.addItem(x);
        s.qlength();
    });
};
var Work;
(function (Work) {
    var FirstInFirstOut = (function () {
        function FirstInFirstOut() {
        }
        FirstInFirstOut.prototype.add = function (item, queue) {
            queue.push(item);
            return queue;
        };
        return FirstInFirstOut;
    }());
    Work.FirstInFirstOut = FirstInFirstOut;
    var FirstInLastOut = (function () {
        function FirstInLastOut() {
        }
        FirstInLastOut.prototype.add = function (item, queue) {
            queue.unshift(item);
            return queue;
        };
        return FirstInLastOut;
    }());
    Work.FirstInLastOut = FirstInLastOut;
    var Priority = (function () {
        function Priority() {
            this.it = 0;
        }
        Priority.prototype.add = function (item, queue) {
            var length = queue.length;
            if (length === 0) {
                queue.push(item);
                return queue;
            }
            var currentIndex = 0;
            while (currentIndex < length) {
                if (queue[length - 1].priority >= item.priority) {
                    queue.push(item);
                    return queue;
                }
                if (queue[0].priority < item.priority) {
                    queue.unshift(item);
                    return queue;
                }
                if ((queue[currentIndex].priority > item.priority) && (queue[currentIndex + 1].priority <= item.priority)) {
                    var queueCopy = queue.slice(0, length);
                    var highPriority = queueCopy.splice(0, currentIndex + 1);
                    highPriority.push(item);
                    var lowPriority = queueCopy;
                    return highPriority.concat(lowPriority);
                }
                currentIndex++;
            }
        };
        return Priority;
    }());
    Work.Priority = Priority;
})(Work || (Work = {}));
var Work;
(function (Work) {
    var PrintItems = (function () {
        function PrintItems() {
        }
        PrintItems.prototype.process = function (item) {
            console.log(item);
        };
        return PrintItems;
    }());
    Work.PrintItems = PrintItems;
})(Work || (Work = {}));
var Work;
(function (Work) {
    var Queue = (function () {
        function Queue(workStrategy, addItemStrategy, currentItem, queue, interval, length) {
            if (currentItem === void 0) { currentItem = null; }
            if (queue === void 0) { queue = []; }
            if (interval === void 0) { interval = 500; }
            if (length === void 0) { length = 0; }
            this.workStrategy = workStrategy;
            this.addItemStrategy = addItemStrategy;
            this.currentItem = currentItem;
            this.queue = queue;
            this.interval = interval;
            this.length = length;
        }
        Queue.prototype.nextItem = function () {
            var _this = this;
            if (this.length === 0) {
                console.log("*** QUEUE FINISHED");
                return;
            }
            if (this.currentItem !== null) {
                console.log("*** await process end");
            }
            else {
                this.currentItem = this.queue.shift();
                this.workStrategy.process(this.currentItem);
                this.length--;
                this.currentItem = null;
            }
            setTimeout(function () { _this.nextItem(); }, this.interval);
        };
        Queue.prototype.addItem = function (item) {
            this.queue = this.addItemStrategy.add(item, this.queue);
            this.length++;
            console.log(this.queue);
        };
        Queue.prototype.qlength = function () {
            console.log("&& queue length", this.queue.length, this.queue.slice(0, this.queue.length));
        };
        return Queue;
    }());
    Work.Queue = Queue;
})(Work || (Work = {}));
