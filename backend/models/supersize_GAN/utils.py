import os 
import numpy as np 
import cv2 
from matplotlib import pyplot as plt 



# Load images and resizing as numpy array 
def load_images(image_list,path,resize=False):
    images=[]
    for image in (image_list):
        if resize==True:
            img = cv2.resize(cv2.imread(os.path.join(path,image)),(256,256)) 
        else:
            img = cv2.imread(os.path.join(path,image))
        img = img.reshape(img.shape[2],img.shape[0],img.shape[1])
        images.append(img)
    return np.array(images)



#loading model check point
def load_checkpoint(filepath):
    checkpoint = torch.load(filepath)
    model = checkpoint['model']
    model.load_state_dict(checkpoint['state_dict'])
    for parameter in model.parameters():
        parameter.requires_grad = False
    
    model.eval()
    
    return model


#image post processing after computation by the model and generating high res pictures
def image_post_process(image_dir,model_path):
    imagelist=[]
#     images = os.listdir(imagedir)
    for img in image_dir:
        img = os.path.join(data,img)
#         print(img)
        img = cv2.imread(img)
        imagelist.append(img)
    imagearray = np.array(imagelist)/255
#     imagearray = (imagedir)/255
    imagearray_pt = np.reshape(imagearray,(len(imagelist),imagearray.shape[3],imagearray.shape[1],imagearray.shape[2]))
    model = load_checkpoint(modelPath)
    im_tensor = torch.from_numpy(imagearray_pt).float()
    out_tensor = model(im_tensor)
#     print(out_tensor.shape)
    out = np.reshape(out_tensor,[out_tensor.shape[0],out_tensor.shape[2],out_tensor.shape[3],out_tensor.shape[1]])
    out = out.numpy()
    
    out = np.clip(out,0,1)
    
    return out

