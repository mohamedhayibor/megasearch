# megasearch ![](https://img.shields.io/badge/status-stable-green.svg)

This module will open new tabs for every result in the first page results for **npm**, **Google**, **Github**, **Stackoverflow**, **Mozilla** and  **Gist (Github)** :sunglasses:

## Installation
```sh
> npm install -g megasearch
```

> Don't forget the "-g" to install it globally. (then you can run the `ms` command anywhere)

## Usage

On your terminal:
```sh
  > ms <site> <query>
```
> <site> will be either google, npm, mdn, stack, github

Examples queries:
```sh
  > ms google what is a middleware
  > ms npm parser
  > ms mdn coercion
  > ms stack how does javascript generators work
  > ms gist diff algorithm
```
> mdn stands for Mozilla Developer Network. ms stands for **megasearch**

# Demo

![](http://g.recordit.co/HIfX3MNjDi.gif)

#### Api

No api to mess with. Enter the command and get instant results. :sunglasses:

> If you are on Chrome, the tabs will be ordered from most relevant to less relevant (left to right). Please keep your browser open before running the command.

### Raison D'etre
You cannot possibly know everything and as long as you can get the info you need fast you are in good shape. This package is an automation of my workflow. I search, click around and leave the tabs that might be useful open. This package allows you to search and automatically open all tabs of the first page results. Then you can close any junk tabs with "cmd+w" or "ctrl+w".

Another benefit is that all tracking stuff are removed in the case of `ms google`

> This package does this automation super well.

## License
MIT © [Mohamed Hayibor](http://github.com/mohamedhayibor)
