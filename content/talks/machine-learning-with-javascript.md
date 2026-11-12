---
title: 'Teaching machines how to do cool things with JavaScript'
date: '2018-04-28'
category: 'ai'
description: 'A closer look at modern applications of machine learning, and the how and why of JavaScript implementation.'
presentedAt:
  - eventDate: '2018-04-28'
    eventName: 'Zeit Day'
    eventType: 'conference'
    recordedPresentationUrl: 'https://youtu.be/QaV7a64mUYE'
    location: 'San Francisco, CA'
---

My first conference talk! What's the difference between machine learning and artificial intelligence? Can we use JavaScript to implement it? And how easy is it to teach these machines to do cool things?

## What I Covered

- What machine learning is, and how it differs from artificial intelligence ("machine learning paves the path to artificial intelligence")
- Supervised vs. unsupervised learning
- A few basic learning types: linear regression, classification, and clustering
- Discrete vs. continuous data, and what it tells you about which learning type to reach for
- A demo: taking a "dumb" Twitter bot and making it smarter using nothing but its standard input (tweets)
- The bias-variance tradeoff
- What a neural network is, and two of its types: artificial (ANN) vs. convolutional (CNN)
- Why use JavaScript for any of this, and where it falls short compared to tools built for large data sets

## The ML Landscape in 2018

At the time of this talk, the JavaScript ML ecosystem was emerging:
- TensorFlow.js had just been released
- Brain.js was gaining traction
- ML5.js was making ML accessible to creative coders

## Demo: Image Classification in the Browser

The talk includes a live demo of running image classification entirely in the browser:
1. Load a pre-trained MobileNet model
2. Capture webcam input
3. Classify images in real-time
4. Display predictions with confidence scores

## Key Takeaways

- You don't need Python to do ML
- Pre-trained models make it easy to get started
- Browser-based ML enables new user experiences
- The ecosystem is growing rapidly

## Looking Back

This talk from 2018 feels prescient given where we are now with AI. The fundamentals of running models in JavaScript have only become more relevant with the rise of edge computing and on-device AI.

## Further Reading

- [A Step-by-Step Backpropagation Example](https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/)
- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/index.html)
- [Machine Learning in Other Languages: JavaScript](http://burakkanber.com/blog/machine-learning-in-other-languages-introduction/)
- [Brain.js](https://github.com/BrainJS/brain.js): GPU-accelerated neural networks for Node.js and the browser
- [The TensorFlow Playground](https://github.com/tensorflow/playground)

## Slides

- [Live slides](https://kale-stew.github.io/zeit-day-2018/)
- [Exported PDF](https://github.com/kale-stew/zeit-day-2018/blob/master/final.pdf)
