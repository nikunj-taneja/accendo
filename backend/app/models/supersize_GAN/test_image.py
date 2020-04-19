import time

import torch
from PIL import Image
from torch.autograd import Variable
from torchvision.transforms import ToTensor, ToPILImage

from model import Generator

CUDA = torch.cuda.is_available()


UPSCALE_FACTOR = 4
TEST_MODE = 'CPU'
IMAGE_NAME = 'sample.png'
MODEL_NAME = 'netG_epoch_4_100.pth'

model = Generator(UPSCALE_FACTOR).eval()
if CUDA:
    model.cuda()
    model.load_state_dict(torch.load('epochs/' + MODEL_NAME))
else:
    model.load_state_dict(torch.load('epochs/' + MODEL_NAME, map_location=lambda storage, loc: storage))


image = Image.open(IMAGE_NAME)
with torch.no_grad():
    image = Variable(ToTensor()(image))
if CUDA:
    image = image.cuda()
image = image[:3].unsqueeze(0)


out = model(image)
out_img = ToPILImage()(out[0].data.cpu())
out_img.save('out_srf_' + str(UPSCALE_FACTOR) + '_' + IMAGE_NAME)


