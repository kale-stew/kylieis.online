---
title: 'ML on the CL'
date: '2018-06-28'
category: 'ai'
description: 'Implementing machine learning on the command line using Node.js libraries. Quick-start projects you can get started with on your own.'
presentedAt:
  - eventDate: '2018-06-28'
    eventName: 'js.la'
    eventType: 'meetup'
    eventUrl: 'https://js.la'
    recordedPresentationUrl: 'https://youtu.be/MzrDy4s8MF8'
    location: 'Los Angeles, CA'
---

Machine learning doesn't have to mean Python and Jupyter notebooks. This talk explores how to build ML-powered CLI tools using Node.js.

## Why CLI?

- **Scriptable** - Integrate into existing workflows
- **Fast iteration** - No UI to build
- **Composable** - Unix philosophy, pipe data between tools
- **Accessible** - Every developer has a terminal

## Tools and Libraries

### TensorFlow.js
Run TensorFlow models in Node.js:
```javascript
const tf = require('@tensorflow/tfjs-node')
const model = await tf.loadLayersModel('file://./model/model.json')
```

### Natural
NLP toolkit for Node:
```javascript
const natural = require('natural')
const tokenizer = new natural.WordTokenizer()
tokenizer.tokenize("This is a sentence")
```

### Brain.js
Simple neural networks:
```javascript
const brain = require('brain.js')
const net = new brain.NeuralNetwork()
net.train([{ input: [0, 0], output: [0] }])
```

## Demo Projects

The talk walks through building:
1. A sentiment analysis CLI
2. A text classifier for categorizing input
3. An image recognition tool using pre-trained models

## Getting Started

All demo code is available on GitHub with step-by-step instructions.
