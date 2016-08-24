npm install --save-dev karma-spec-reporter

Karma conf : 
 config.set({
 plugins: [require('karma-spec-reporter')]
 reporters: ['spec'],
 })