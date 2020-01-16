# Quiz Tool
An HTML5 based tool to manage the screen content during a quiz session.

The quiz can have multiple rounds with each round having multiple questions. The questions can be simple text based or Audio-visual. Number of rounds, questions per round and each question can be configured in json files. Looks at `question1.json` and `question2.json` for sample cases.

To run the quiz session, multiple controls are available on the bottom of the screen. Each of these also have a shortcut. So one may choose to hide the controls and use the keys to operate tool.

## Usage

1. Configure the questions in the question<n>.json file.
2. Create as many files as you want and include them in the index.html file.
3. Open the index.html file in any browser.

## On-screen Controls
- Play ( `Alt+l`): Play audio/video or show image
- Question  (`Atl+q`): Show question
- Options (`Alt+o`): Show options (if defined)
- Timer (`Alt+t`): Start timer (as configured in the question with time param)
- Pass (`Alt+p`): Start pass timer (as configured in the question with time param); also stops any previously running timer.
- Clear (`Alt+c`): Hide any audio/video/image, stop any running timer, hide question/options/answer etc from screen
- NextQ (`Alt+n`): Jump to next question; doesn't do anything on screen
- NextRd (`Alt+r`): Jump to next round
- Answer (`Alt+a`): Show correct answer for current question
- Right (`Alt+u`): Plays correct answer sound
- Wrong (`Alt+w`): Plays incorrect answer sound

## Question format
``` js
    {
        "Q": "",
        "type": "text",     // could be image, audio, video
        "answer": 3,        // index of correct answer from options (0 based). If no options, it can be text too
        "time": 10,         // (in secs) how long should a team get to answer the question 
        "pass_time": 5,     // (in secs) how long a team can take when this question is passed question 
        "options":[         // If the question is multiple choice based
            "A",
            "B",
            "C",
            "D"
        ]
    }
```


## Uses
The tool uses:
- jQuery
- jQuery plugin [circularCountdown](https://github.com/sygmaa/CircularCountDownJs)
- Bootstrap

