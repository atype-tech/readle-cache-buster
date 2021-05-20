import arg from 'arg';
import { purgeLabels } from './main';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rawArgs) {
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

async function promptForMissingOptions(options) {
    const questions = [];
   
    if (!options.urls) {
      questions.push({
        type: '',
        name: 'urls',
        message: 'List the urls to clear from cache (comma separated e.g. https://google.com, https://bing.com)',
      });
    }
   
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      urls: options.urls || answers.urls,
    };
   }

export async function cli(args) {
 let options = parseArgumentsIntoOptions(args);
 options = await promptForMissingOptions(options);
 await purgeLabels(options);
//  console.log(options);
}