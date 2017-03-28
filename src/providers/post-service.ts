import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

constructor(private http:Http){
}
  getPosts(){
    return this.http.get('assets/library.json')
      .map((res: Response) => res.json());
  }
  uploadMock(){
  return new Promise((resolve, reject) => {
    resolve(
      {"response":{"base":"http://bs.plantnet-project.org/img/","map":{"IMAG5061.jpg":"be2b0ef1811752daf75187e5565c40d6cdf38269"}}}
    );
  })
  }
  getVariants(location, baseUrl, imageName, plantType){
    return this.http.get('http://identify.plantnet-project.org/api/project/'+location+'/identify?imgs='+baseUrl+imageName+'&tags='+plantType+'&json=true&lang=en&app_version=web-1.0.0')
      .map((res: Response) => res.json());
  }

  getWikiImg(gen) {
    return this.http.get('http://en.wikipedia.org/w/api.php?action=query&titles='+gen+'&prop=pageimages&format=json&pithumbsize=300')
      .map((res: Response) => res.json());
  }
}
