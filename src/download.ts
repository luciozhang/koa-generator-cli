import gitclone from 'git-clone/promise';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';

export const downloadTemplate = (name: string, templateGitUrl: string, downloadPath: string)=>{
  const loading = ora('download template');
  return new Promise(async (resolve, reject)=>{
    try {
      loading.start('start download template');
      await gitclone(templateGitUrl, downloadPath, { checkout: 'master', shallow: true });
      fs.removeSync(path.join(downloadPath, '.git'))
      loading.stop();
      loading.succeed('download success');
      resolve('download success');
    } catch (error) {
      reject(error);
      loading.stop();
      loading.fail('download fail');
    }
  });
}