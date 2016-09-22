/**
 * Created on 09.09.2016.
 */

import {Headers} from "@angular/http";

export class ApplicationProperties {
  public usernameFromLocalStorage: string = localStorage.getItem("currentUsername");
  public getTokenFromLocalStorage: string = localStorage.getItem("token");

  public jsonHeader: Headers = new Headers({'Content-Type': 'application/json'});
  public authHeader: Headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token")
  });

  public newestPhotosUrl: string = "http://localhost:8080/photo/getByNewest";
  public byIdOfFirstPhotosUrl: string = "http://localhost:8080/photo/getPhotosByIdOfFirst";
  public photosByUserUrl: string = "http://localhost:8080/photo/getByUser";
  public uploadImageUrl: string = "http://localhost:8080/storage/upload";
  public deleteImageUrl: string = "http://localhost:8080/storage/delete";
  public addPhotoUrl: string = "http://localhost:8080/photo/add";

  public addLikeToPhotoUrl: string = "http://localhost:8080/like/give";
  public undoLikeToPhotoUrl: string = "http://localhost:8080/like/take";

  public addCommentUrl: string = "http://localhost:8080/comment/add";
  public getCommentsByPhotoIdUrl: string = "http://localhost:8080/comment/getByPhotoId";

  public registerUserUrl: string = "http://localhost:8080/user/register";
  public isEmailExistingUrl: string = "http://localhost:8080/user/isEmailExisting";
  public getUserByUsernameUrl: string = "http://localhost:8080/user/getByUsername";
  public isUsernameExistingUrl: string = "http://localhost:8080/user/isUsernameExisting";

  public loginUserUrl: string = "http://localhost:8080/user/login";

  public searchUserUrl: string = "http://localhost:8080/search/user";


  // public newestPhotosUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/photo/getByNewest";
  // public byIdOfFirstPhotosUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/photo/getPhotosByIdOfFirst";
  // public photosByUserUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/photo/getByUser";
  // public uploadImageUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/storage/upload";
  // public deleteImageUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/storage/delete";
  // public addPhotoUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/photo/add";
  //
  // public addLikeToPhotoUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/like/give";
  // public undoLikeToPhotoUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/like/take";
  //
  // public addCommentUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/comment/add";
  // public getCommentsByPhotoIdUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/comment/getByPhotoId";
  //
  // public registerUserUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/user/register";
  // public isEmailExistingUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/user/isEmailExisting";
  // public getUserByUsernameUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/user/getByUsername";
  // public isUsernameExistingUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/user/isUsernameExisting";
  //
  // public loginUserUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/user/login";
  //
  // public searchUserUrl: string = "http://photoset-env.us-west-2.elasticbeanstalk.com/search/user";

}
