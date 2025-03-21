module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'feat', 
          'fix', 
          'docs', 
          'style', 
          'refactor', 
          'perf', 
          'test', 
          'chore', 
          'ci', 
          'build', 
          'wip', 
          'hotfix', 
          'release', 
          'init', 
          'revert'
        ]
      ]
    }
  };
  