# TimeTracker
Time tracking app written in html, css, and javascript by Dave Winfield

## Desciption

Create JS App that allows an **employee** to **punch in** to a **task** for a **customer** under a specific **job number** and allows for a **description** of the activity to be **noted**. 

Upon punching in, the app creates and **li** that is added to an **ol** that is ordered by a **date array**. The date array is determined by the **punch array** of the employees. The punch list element has all relevant informatoion presented in a card, with a **stop button** that toggles to a **start button** upon clicking it. It also has a **delete button**

Once finsihed with the task the employee can end that activity and **punch out** using the stop button. The button toggles to a start button. If the employee click the start button again, a new **start time line** is added to the card and the button toggles to a stop button.

### Job Entry
- Form elements
  * Employee
  * Job Number entry
  * Customer
  * Job Description/Note
  * Task drop down
  * Add/Begin project button

### Time Punch Card List
- Time Punches Header
  * Show/Hide toggle button
    - Date list
        * Day
        * Date
        * Hide Button

    - Punch Card
        * Employee | Job Number | Client
        * Start/Stop Button
        * Start time
        * End Time
        * Elapsed Time
        * Description area
        * Edit Button
        * Add time button

### Punch Time Table View
- Table View Header
  * Show all info as a table
  * Sort info by clicking table column header
    * Multiple sort can be achieved with multiple column clicks


