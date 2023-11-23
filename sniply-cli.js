#!/usr/bin/env node

import { program } from 'commander';
import simpleGit from 'simple-git';
import path from 'path';
import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';

program
  .version('1.0.0')
  .description('Sniply CLI');

program
  .command('create <projectName>')
  .description('Create a new project')
  .action(async (projectName) => {
    console.log(chalk.green(`Creating a new sniply project: ${projectName}`));

    // Create a directory for the new project
    const projectPath = path.join(process.cwd(), projectName);
    fs.mkdirSync(projectPath);

    // Clone the project from a Git repository
    const repositoryUrl = 'https://github.com/pholoshos/sniply.git'; // Replace with your actual repository URL
    const spinner = ora({
      text: `Cloning from ${repositoryUrl}...`,
      spinner: 'bouncingBall',
    }).start();

    // Clone the repository
    try {
      await simpleGit().clone(repositoryUrl, projectPath);
      spinner.succeed(chalk.green('Project created successfully!'));
      console.log(chalk.yellow(`\nTo get started, run the following commands:`));
      console.log(chalk.cyan(`cd ${projectName}`));
      console.log(chalk.cyan('npm install'));
      console.log(chalk.cyan('npm run dev'));
      console.log(chalk.yellow('\nHappy hacking! 🚀'));
    } catch (err) {
      spinner.fail(chalk.red(`Error cloning repository: ${err}`));
    }
  });

program
  .command('build')
  .description('Build the project')
  .action(() => {
    const spinner = ora({
      text: 'Building the project...',
      spinner: 'dots',
    }).start();

    // Add logic for building the project

    // Assume the build process takes some time, so simulate it with a timeout
    setTimeout(() => {
      spinner.succeed(chalk.green('Project build complete!'));
    }, 3000); // Simulating a 3-second build process
  });

// Add more commands as needed

program.parse(process.argv);
