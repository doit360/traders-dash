const execa = require('execa');
const cc = require('conventional-changelog');
const custom = require('@anteriovieira/conventional-changelog');

const gen = module.exports = version => {
  const filestream = require('fs').createWriteStream('CHANGELOG.md');

  cc({
    config: custom,
    releaseCount: 0,
    pkg: {
      transform(pkg) {
        pkg.version = `v${version}`;
        return pkg;
      },
    },
  }).pipe(filestream).on('close', async() => {
    delete process.env.PREFIX;

    await execa('git', ['add', '-A'], {stdio: 'inherit'});
    await execa('git', ['commit', '-m', `chore(changelog): publish v${version}`], {stdio: 'inherit'});
    await execa('git', ['tag', `v${version}`], {stdio: 'inherit'});
    await execa('git', ['push', 'origin', '--tags'], {stdio: 'inherit'});
    await execa('git', ['push', 'origin', 'master'], {stdio: 'inherit'});
  });
};

if (process.argv[2] === 'run') {
  const version = require('../package.json').version;
  gen(version);
}