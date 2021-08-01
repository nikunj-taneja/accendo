<p align="center"><img src="https://i.ibb.co/9WHVrbc/Screenshot-2021-07-29-at-10-50-14-PM.png" alt="Screenshot-2021-07-29-at-10-50-14-PM" border="0" width=320></p>

## Introduction
A web app which enables users to upload images, have them supersized or stylized with custom styles using deep learning models like neural style transfer & Super Resolution GAN, and optionally post them on the community gallery. Users can also see each other's posts on the gallery and like them. 

This was a group project for the junior year course CSCI3100 Software Engineering taught by Prof. Michael Lyu at CUHK. 

Tech stack: React, Flask, PyTorch, MongoDB, Docker

## Architecture

<p float="left">
<img src="https://i.ibb.co/Pw0yWbs/Screenshot-2021-07-29-at-10-56-54-PM.png" alt="Screenshot-2021-07-29-at-10-56-54-PM" border="0" height=330>
<img src="https://i.ibb.co/ftpycds/Screenshot-2021-07-29-at-10-45-11-PM.png" alt="Screenshot-2021-07-29-at-10-45-11-PM" border="0" height=330>
</p>

## Frontend 

<img src="showcase_images/login-signup.PNG" alt="login" width="640"/>&nbsp;
<img src="showcase_images/Stylize.PNG" alt="stylize" width="640"/>
<img src="showcase_images/successful_stylize.PNG" alt="successful_stylize" width="640"/>
<img src="showcase_images/community.PNG" alt="community" width="640"/>

## Deep Learning Models

### Neural Style Transfer

#### Architecture

<img src="https://user-images.githubusercontent.com/37034031/42068027-830719f4-7b84-11e8-9e87-088f1e476aab.png" alt="style_transfer" width="640"/>

#### Example

##### Content Image

<img src="showcase_images/MLmodel/hong_kong.jpg" alt="HK" width="640"/>

##### Style Image

<img src="showcase_images/MLmodel/wave.jpg" alt="wave" width="640"/>

##### Stylized Image

<img src="showcase_images/MLmodel/output.jpg" alt="stylized" width="640"/>

### SRGAN

#### Architecture
<img src="https://paperswithcode.com/media/methods/Screen_Shot_2020-07-19_at_11.13.45_AM_zsF2pa7.png" alt="srgan_architecture" width="640"/>

#### Example

<img src="https://miro.medium.com/max/981/1*E-JmUwv7zbwjzFm1hJLxPA.png" alt="srgan_example" width="640"/>

### References
[1] Johnson, Justin, Alexandre Alahi, and Li Fei-Fei. "Perceptual losses for real-time style transfer and super-resolution." European conference on computer vision. Springer, Cham, 2016. [https://arxiv.org/abs/1603.08155]

[2] Ledig, Christian, et al. "Photo-realistic single image super-resolution using a generative adversarial network." Proceedings of the IEEE conference on computer vision and pattern recognition. 2017. 
