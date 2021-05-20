import arg from 'arg';
import { purgeLabels, purgeWords } from './main';
import inquirer from 'inquirer';

function purgeWhat(rawArgs) {
    const args = arg(
        {
            '--function': String
        },
        {
            argv: rawArgs.slice(2)
        }
    );
    return {
        function: args['--function']
    }
}

async function promptForPurgeWhat(options) {
    const questions = [];   
    if (!options.function) {
      questions.push({
        type: 'list',
        name: 'function',
        message: 'What do you want to purge?',
        choices: ['labels', 'words/MP3s']
      });
    }
   
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      function: options.function || answers.function,
    };
   }

function parseArgsForLabels(rawArgs) {
    const args = arg(
        {
            '--language': String
        },
        {
            argv: rawArgs.slice(2)
        }
    );
    return {
        function: args['--language']
    }
}

async function promptForPurgeLabels(options) {
    const questions = [];   
    if (!options.language) {
      questions.push({
        type: 'list',
        name: 'language',
        message: 'What language do you want to purge?',
        choices: ['all', 'eng', 'fr', 'ja', 'tr', 'zh-hans', 'zh-hant', 'vi']
      });
    }
   
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      langauge: options.langauge || answers.language,
    };
   }

function parseArgsForWords(rawArgs) {
 const args = arg(
   {
     '--urls': String,
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   url: args['--urls']
 };
}

async function promptForPurgeWords(options) {
    const questions = [];
   
    if (!options.urls) {
      questions.push({
        type: '',
        name: 'urls',
        message: 'List the urls to clear from cache (comma separated e.g. https://dewenbao.com/api/story/preview/eng/0, https://dewenbao.com/wp-content/plugins/wp_word_translation/controller/word_api.php?id=61&category=pluralwort)',
      });
    }
   
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      urls: options.urls || answers.urls,
    };
   }

export async function cli(args) {
    let operation = purgeWhat(args);
    operation = await promptForPurgeWhat(operation)
    
    if (operation.function === "labels") {
        let options = parseArgsForLabels(args);
        options = await promptForPurgeLabels(options)

        await purgeLabels(options);
        return
      } else if (operation.function === "words/MP3s") {
      let options = parseArgsForWords(args);
      options = await promptForPurgeWords(options)

      await purgeWords(options);
      return
    }
//  let options = parseArgumentsIntoOptions(args);
//  options = await promptForMissingOptions(options);
//  console.log(options);
}