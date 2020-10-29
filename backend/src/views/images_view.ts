import Image from '../model/Image'

export default {
    render(image: Image){
        return {
            id: image.id,
            url: `http://192.168.25.75:3333/uploads/${image.path}` // 192.168.25.75: or localhost
        };
    },
    
    renderMany(images: Image[]){
        return images.map(image => this.render(image));
    }
}