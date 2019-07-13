# Kickback-ReactNative
[![Version](https://img.shields.io/badge/version-v0.1.0-brightgreen.svg)](https://gitlab.com/goldfish-projects/kickback-reactnative)
[![Language](https://img.shields.io/badge/ReactNative-0.56.0-blue.svg)](https://gitlab.com/goldfish-projects/kickback-reactnative)
## Table of Contents
- [Overview](#overview)
- [Build status](#build-status)
- [Dependencies](#dependencies)
- [Features](#Mmvp-features)
- [Installation](#installation)
- [Licensing](#licensing)
- [Issues](#issues)
 
## Overview

## Build status


[![Bugs](https://sonar.dev.hdwebsoft.co/api/project_badges/measure?project=KickbackReact%3Adevelop&metric=bugs)](https://gitlab.com/goldfish-projects/kickback-reactnative)
[![Coding Standard](https://sonar.dev.hdwebsoft.co/api/project_badges/measure?project=KickbackReact%3Adevelop&metric=code_smells)](https://gitlab.com/goldfish-projects/kickback-reactnative)
[![Duplicated Lines](https://sonar.dev.hdwebsoft.co/api/project_badges/measure?project=KickbackReact%3Adevelop&metric=duplicated_lines_density)](https://gitlab.com/goldfish-projects/kickback-reactnative)
[![Code](https://sonar.dev.hdwebsoft.co/api/project_badges/measure?project=KickbackReact%3Adevelop&metric=ncloc)](https://gitlab.com/goldfish-projects/kickback-reactnative)
[![Sonarqube](https://sonar.dev.hdwebsoft.co/api/project_badges/quality_gate?project=KickbackReact%3Adevelop)](https://gitlab.com/goldfish-projects/kickback-reactnative)

## Dependencies
- All code is written in Reactnative v0.56.0
- Some code depends on 


## MVP Features
_General_
- Sign in
- Sign up
- Update Profile
- Follow
- Unfollow

_Main Feed_
- Dashboard
- My U
- Feed
- Like
- Share
- Comment
- Create Post
- Post Photo
- Autolike
- Search Bar


## Installation
Provide step by step series of examples and explanations about how to get a development env running.
- Go to folder `/node_modules/react-native-image-crop-picker/ios/src/ImageCropPicker.m`
  - Then add the line no. 377 that is :
         ```
        CGFloat x = 0;
        CGFloat y = imageCropVC.view.frame.origin.y + imageCropVC.view.frame.size.height - 60;
        UIView *view = [[UIView alloc] initWithFrame:CGRectMake(x, y, imageCropVC.view.frame.size.width, 60)];
        [view setAlpha:0.5f];
        [view setBackgroundColor:[UIColor blackColor]];
        [imageCropVC.view addSubview: view];
        [imageCropVC.view bringSubviewToFront:imageCropVC.chooseButton ];
        [imageCropVC.view bringSubviewToFront:imageCropVC.cancelButton ];
         ```
- Go to folder `/node_modules/react-native-uploader/RNUploader/RNUploader.m`
  - Then change the line no. 6 that is `"RCTBridgeModule.h"` to:
         ```
         <React/RCTBridgeModule.h>
         ```
- Go to folder `/node_modules/react-native-swiper/src/index.js`
  - Then change the line no. 585 that is `button` to:
         ```
         {this.props.nextButton ? this.props.nextButton : button}
         ```
  - Then change the line no. 601 that is `button` to:
         ```
         {this.props.prevButton ? this.props.prevButton : button}
         ```
- Go to folder `/node_modules/react-native-navigation/ios/RCCTabBarController.m`
  - Then change the line no. 296 that is `iconImage = [[self image:iconImage withColor:self.tabBar.tintColor] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];` to:
         ```
         iconImage = [[self image:iconImage withColor: self.tabBar.unselectedItemTintColor] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
         ```
## Licensing

This project is licensed under Unlicense license. This license does not require
you to take the license with you to your project.



## [issues](https://gitlab.com/goldfish-projects/kickback-reactnative/issues/new)


