# 05 Third-Party APIs: Work Day Scheduler

## Description

This is a simple calendar application that allows a user to save events for each hour of the work day. This app runs in the browser and feature dynamically updated HTML and CSS powered by jQuery.

This calendar has only 9 hours in it, from 9 am to 5 pm. It doesn't track days. It has 3 columns. The left column is the time of day and is static. The middle column is where the user enters events. The background color of the text area/time block changes color depending on the time of day. The background color is gray for past events, pink for the present and green for the future. The right column are "save event" buttons, also static except they change color slightly if the mouse moves over them.

The events are stored in local storage until 5 pm when time blocks/text areas and local storage are cleared. Between 5 pm and 9 am all the time blocks/text areas will be gray. At 9 am the next morning the first time block/text area will turn pink and the remainder green.

In script.js there is a variable named test that when set to true causes the time to be 11 am. It is useful to test the colors when the time is outside of 9 to 17. For production this variable is set to false, that is, no test and the actual time is used.

This app uses the [Moment.js](https://momentjs.com/) library to work with date and time.

The following figure shows the app when the time is 11 am.

![alt text](assets/images/snapshoot-web-page-simple-calendar.png)

## Credits

Trilogy Education Services provided the HTML and CSS code to me. I then programmed the JavaScript code.

## License

Copyright (c) [2021] [William T Pate]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

- - -
?? 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
