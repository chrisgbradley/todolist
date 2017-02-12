var logbook = (function() {

//****************************************************************
//          PRIVATE
//****************************************************************
    var taskInput = $("#task-input");
    var taskList= $("#tasklist");
    var tasks= $("#tasklist li:not(#awesome)");
    var awesomeMessage = $("#awesome");

    var updateLogbook = function() {
        taskList = $("#tasklist");
        tasks= $("#tasklist li:not(#awesome)");
    } // end updateLogbook()

    var hasValue = function(text) {
        return $.trim(text) !== "";
    } // end hasValue()

    var toggleAwesomeMessage = function() {
        $(awesomeMessage).toggle();
    } // end toggleAwesomeMessage()

    var add = function(text) {
        var isFirstTask = function() {
            return ((tasks.length === 0) ? true:false);
        } // end isFirst()


        //if this is the first task being added, hide the awesome message;
        //the awesome message is **ONLY HIDDEN** the item still exists and
        //still counts toward the tasks length
        if(isFirstTask()) {
            toggleAwesomeMessage();
        } // end if
        $("<li>" + text + "</li>").appendTo(taskList);
        updateLogbook();
    }; // end add()

    var clearInput = function() {
        $(taskInput).val("");
    } // end clearInput()

    var removeTask = function(task) {
        var isLastTask = function() {
            return ((tasks.length === 1) ? true:false);
        } // end isLastTask()


        if(isLastTask()) {
            $(task).remove();
            toggleAwesomeMessage();
        } else {
            $(task).remove();
        } //end if
    }; // end removeTask()

    var initTaskInputListeners = function() {
        taskInput.on("keypress", function(event) {
            if (event.which === 13) {
                newTask();
            }; // end if
        }); // end listener
    }; // end initListeners()

    var initTasksListeners = function() {
        $("#tasklist").on("click", "li", function(e) {
            if(!$(e.target).is("#awesome")) {
                removeTask(this);
                updateLogbook();
            } // end if
        }); // end listener
    } // end initTasksListeners()


//--------------------------------
//         PUSHED TO PUBLIC
//--------------------------------
    var newTask = function() {
        //TODO: translate this to an !isEmpty() method
        if(hasValue(taskInput.val())){
            add(taskInput.val());
            clearInput();
        } // end if
    } // end newTask()

    var initListeners = function() {
        initTaskInputListeners();
        initTasksListeners();
    }
//****************************************************************
//          PUBLIC
//****************************************************************
    return {
        newTask: newTask,
        initListeners: initListeners,
    };

})();

logbook.initListeners();
