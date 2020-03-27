import torch 
import torch.nn
import torch.nn.functional as f
import numpy as np 
import torchsummary as summary
import torch.optim as optim

# Creating the Generator for the GAN model

class Generator(n.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = n.Conv2d(3,64,9,padding=4,bias=False)
        self.conv2 = n.Conv2d(64,64,3,padding=1,bias=False)
        self.conv3_1 = n.Conv2d(64,256,3,padding=1,bias=False)
        self.conv3_2 = n.Conv2d(64,256,3,padding=1,bias=False)
        self.conv4 = n.Conv2d(64,3,9,padding=4,bias=False)
        self.bn = n.BatchNorm2d(64)
        self.ps = n.PixelShuffle(2)
        self.prelu = n.PReLU()
        
    def forward(self,x):
        layer1 = self.prelu(self.conv1(x))
        layer2 = torch.add(self.bn(self.conv2(self.prelu(self.bn(self.conv2(layer1))))),layer1)
        layer3 = torch.add(self.bn(self.conv2(self.prelu(self.bn(self.conv2(layer2))))),layer2)
        layer4 = torch.add(self.bn(self.conv2(self.prelu(self.bn(self.conv2(layer3))))),layer33)
        layer5 = torch.add(self.bn(self.conv2(self.prelu(self.bn(self.conv2(layer4))))),layer4)
        layer6 = torch.add(self.bn(self.conv2(self.prelu(self.bn(self.conv2(layer5))))),layer5)
        layer7 = torch.add(self.bn(self.conv2(layer6)),layer1)
        layer8 = self.prelu(self.ps(self.conv3_1(layer7)))
        layer9 = self.prelu(self.ps(self.conv3_2(layer8)))
        layer10 = self.conv4(layer9)
        return layer10


# Creating the Discriminator for the GAN model

class Discriminator(n.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = n.Conv2d(3,64,3,padding=1,bias=False)
        self.conv2 = n.Conv2d(64,64,3,stride=2,padding=1,bias=False)
        self.bn2 = n.BatchNorm2d(64)
        self.conv3 = n.Conv2d(64,128,3,padding=1,bias=False)
        self.bn3 = n.BatchNorm2d(128)
        self.conv4 = n.Conv2d(128,128,3,stride=2,padding=1,bias=False)
        self.bn4 = n.BatchNorm2d(128)
        self.conv5 = n.Conv2d(128,256,3,padding=1,bias=False)
        self.bn5 = n.BatchNorm2d(256)
        self.conv6 = n.Conv2d(256,256,3,stride=2,padding=1,bias=False)
        self.bn6 = n.BatchNorm2d(256)
        self.conv7 = n.Conv2d(256,512,3,padding=1,bias=False)
        self.bn7 = n.BatchNorm2d(512)
        self.conv8 = n.Conv2d(512,512,3,stride=2,padding=1,bias=False)
        self.bn8 = n.BatchNorm2d(512)
        self.fc1 = n.Linear(512*16*16,1024)
        self.fc2 = n.Linear(1024,1)
        self.drop = n.Dropout2d(0.3)
        
    def forward(self,x):
        layer1 = f.leaky_relu(self.conv1(x))
        layer2 = f.leaky_relu(self.bn2(self.conv2(layer1)))
        layer3 = f.leaky_relu(self.bn3(self.conv3(layer2)))
        layer4 = f.leaky_relu(self.bn4(self.conv4(layer3)))
        layer5 = f.leaky_relu(self.bn5(self.conv5(layer4)))
        layer6 = f.leaky_relu(self.bn6(self.conv6(layer5)))
        layer7 = f.leaky_relu(self.bn7(self.conv7(layer6)))
        layer8 = f.leaky_relu(self.bn8(self.conv8(layer7)))
        layer8 = layer8.view(-1,layer8.size(1)*layer8.size(2)*layer8.size(3))
        layer9 = f.leaky_relu(self.fc1(layer8))
#         block9 = block9.view(-1,block9.size(1)*block9.size(2)*block9.size(3))
        layer10 = torch.sigmoid(self.drop(self.fc2(layer9)))
        return layer9,layer10