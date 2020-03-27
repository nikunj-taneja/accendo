import os
import torch
import torch.nn as n
import torch.nn.functional as f
import numpy as np
import os
from torchsummary import summary
import torch.optim as optim
from tqdm import tqdm
from torchvision import models
import cv2
from matplotlib import pyplot as plt
from model import Discriminator
from model import Generator
import utils 

disc = Discriminator().float()
gen = Generator().float()

vgg = models.vgg19(pretrained=True)

gen_loss = n.BCELoss()
vgg_loss = n.MSELoss()
mse_loss = n.MSELoss()
disc_loss = n.BCELoss()

gen_optimizer = optim.Adam(gen.parameters(),lr=0.0001)
disc_optimizer = optim.Adam(disc.parameters(),lr=0.0001)

def train(batch_size=8, epochs=10, batch_count, image_list, lr_images, hr_images):

    for epoch in range(epochs):
        d1loss_list=[]
        d2loss_list=[]
        gloss_list=[]
        vloss_list=[]
        mloss_list=[]

    #discriminator taining 


    disc.zero_grad()
    gen_out = gen(torch.from_numpy(lr_images).to(cuda).float())
    _,f_label = disc(gen_out)
    _,r_label = disc(torch.from_numpy(hr_images).to(cuda).float())
    d1_loss = torch.mean(disc_loss(f_label,torch.zeros_like(f_label,dtype=torch.float)))
    d2_loss = torch.mean(disc_loss(r_label,torch.ones_like(r_label,dtype=torch.float)))
    d_loss = d1_loss+d2_loss
    d2_loss.backward()
    d1_loss.backward(retain_graph=True)
    disc_optimizer.step()

    #generator training

    gen.zero_grad()
        g_loss = gen_loss(f_label,torch.ones_like(f_label,dtype=torch.float))
        v_loss = vgg_loss(vgg.features[:7](gen_out),vgg.features[:7](torch.from_numpy(hr_images).to(cuda).float()))
        m_loss = mse_loss(gen_out,torch.from_numpy(hr_images).to(cuda).float())
        generator_loss = torch.sum(g_loss+v_loss+m_loss)
        generator_loss.backward()
        gen_optimizer.step()
        
        d1loss_list.append(d1_loss.item())
        d2loss_list.append(d2_loss.item())
        
        gloss_list.append(g_loss.item())
        vloss_list.append(v_loss.item())
        mloss_list.append(m_loss.item())


