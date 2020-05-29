 #### twitchQuoteGetter
 ***
Build JSON of Quotes From Stream Elements

 #### Install:
 1) Download files
 2) run CMD or Powershell in folder (shift+right-click => 'Open PowerShell')
 3) type and run `npm i`

 #### Set-Up:
 1) Rename the file in the .hidden folder to `settings.json`
 2) Edit the information in `settings.json`
  - Bot Username
  - Bot OAUTH Token
  - Your Twitch Username
***
 #### Running Bot
 1) run CMD or Powershell in folder
 2) type and run `node twitchquotegetter.js`
***
  #### Getting the Quotes
  1) make sure the !quote command is set to offline or both mode.
  2) use this command to start the bot: `!allthequotes`
  3) if you want to start a specific quote use a number argument: `!allthequotes 100`
  - The above command will start at quote #100 and run until the end of the list
  4) the bot will run until it reaches the end of the quote list
  5) to stop the bot use command: `!stop`
  6) once complete or stopped there will be a quoteDatabase.json file in the bot folder with all of the quotes

  #### Notes:
  - **This bot is expecting the response from either itself or username "streamelements" for "!quote #" in the format of "@thisbotname, #1: test quote 1"**
  - **This bot is expecting a message in the format of "@thisbotname, no quote found" for a quote that does not exist.**
  - **This bot will stop after 3 consecutive missing quotes messages.** (if the responding bot/'streamelements' is not mod this could be 10 requests due to repeat messages)
  - The delay is set to 9 seconds between quote requests. 100 quotes will take 15 minutes to complete
  - Going quicker could result in quotes being skipped if there is a slow response from Stream Elements
  - It is recommended to get the quotes in batches of 50 or 100 using the starting point and stop commands to prevent data loss and waste of time.
  **Make sure to save the batch data in a new file before restarting as the bot will override all information in the quoteDatabase.json folder!!**
