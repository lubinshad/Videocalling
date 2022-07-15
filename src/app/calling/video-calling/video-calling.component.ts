import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';

@Component({
  selector: 'app-video-calling',
  templateUrl: './video-calling.component.html',
  styleUrls: ['./video-calling.component.scss']
})

export class VideoCallingComponent implements OnInit {
  title = 'angular-video';
  localCallId = 'agora_local';
  // remoteCallId = 'agora_remote';
  remoteCalls: string[] = [];
  //remoteCalls: string[] = ["agora_remote-9", "agora_remote-10", "agora_remote-11", "agora_remote-9", "agora_remote-12", "agora_remote-13"];

  isJoin: boolean = false;

  private client: AgoraClient;
  private localStream: Stream;
  //private remoteStream: Stream;
  private uid: number;

  constructor(private ngxAgoraService: NgxAgoraService,
    private route: ActivatedRoute) {
    
    //this.uid = Math.floor(Math.random() * 100);
    console.log("UID in cons", this.uid)
    //this.uid = this.uid + 1;
  }

  ngOnInit(): void {
    
    //console.log("params",this.route.snapshot.queryParamMap.get('param'))
    if (this.localStream != undefined)
      this.oncallEnd()
    else if (this.remoteCalls.length > 0)
      this.oncallEnd()
    this.onInitActions()
    // this.route.queryParamMap.subscribe((params) => {
    //   

    //   console.log("params out if", params)
    //   console.log("params.keys", params.keys)

    //   if (params.keys.length !== 0) {
    //     //Fthis.isJoin = true;
    //     this.onInitActions()
    //   }

    // }
    // );
    //this.initRemoteStream(() => this.join(uid => this.publishremote(), error => console.error(error)));
  }
  onInitActions() {
    
    this.isJoin = true;
    console.log("before remoteCalls", this.remoteCalls)
    // this.remoteCalls = this.remoteCalls.filter(ids => {
    //   if (ids !== ids) {
    //     console.log("ids", ids)
    //   }
    // });
    // let unique = [...new Set(this.remoteCalls)];
    // this.remoteCalls=unique;
    //console.log("unique", unique)

    console.log("after remoteCalls", this.remoteCalls)

    this.uid = Math.floor(Math.random() * 100);
    console.log("Uid in onInitActions", this.uid)
    // this.uid = this.uid + 1;
    //this.localCallId = 'agora_local';
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();
    ///added
    if (this.localStream == undefined) {
      this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      //this.localCallId = this.getLocalId(this.localStream)
      // this.remoteStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      this.assignLocalStreamHandlers();
      //this.initLocalStream();
      
      this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
      // this.initLocalStream();
      // this.join()
      // this.publish()
    }
    else {
      
      this.join(uid => this.publish(), error => console.error(error))
    }
  }
  //Options for joining a channel
  // var option = {
  //   mode: "rtc",
  //   codec: "h264",
  //   appID: "",
  //   channel: "qiossa",
  //   uid: null,
  //   token: "006a27d03d0edf54749a03597d72ad82aaaIADkVIvop7lo0OEkm/7Tuz/Tp4M+TXhFd9DkLAAwu9fNllwgy+4AAAAAEAD4aAmV2FzKXgEAAQBjT8pe"
  // };


  // Create a client
  //rtc.client = AgoraRTC.createClient({mode: option.mode, codec: option.codec});

  // Initialize the client
  // rtc.client.init(option.appID, function () {
  //   console.log("init success");
  //   }, (err) => {
  //   console.error(err);
  // });

  // this.client.init(
  //   () => {
  //     // The user has granted access to the camera and mic.
  //     this.client.play(this.remoteCallId);
  //     if (onSuccess) {
  //       onSuccess();
  //     }
  //   },
  //   err => console.error('getUserMedia failed', err)
  // );


  // Join a channel
  // rtc.client.join(option.token, option.channel, option.uid, function (uid) {
  //   console.log("join channel: " + option.channel + " success, uid: " + uid);
  //   rtc.params.uid = uid;

  /**
 * Attempts to connect to an online chat room where users can host and receive A/V streams.
 */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    
    console.log("UID in join", this.uid)
    // console.log("UID", this.client.join(null, 'Agora-video', this.uid, onSuccess, onFailure));
    this.client.join(null, 'Agora-video', this.uid, onSuccess, onFailure)
  }

  // join1(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
  //   
  //   console.log("UID in join", this.uid)
  //   // console.log("UID", this.client.join(null, 'Agora-video', this.uid, onSuccess, onFailure));
  //   this.client.join(null, 'Agora-video', this.uid, onSuccess, onFailure)
  // }

  // clientJoin() {
  //   
  //   console.log("Hi there")
  //   //this.client.join(null, 'abc', Math.floor(Math.random() * 100));
  //   this.onInitActions();
  //   // this.client.on(ClientEvent.RemoteStreamAdded, evt => {
  //   //     
  //   //     const stream = evt.stream as Stream;
  //   //     this.client.subscribe(stream, { audio: true, video: true }, err => {
  //   //       console.log('Subscribe stream failed', err);
  //   //     });
  //   //   });
  //   //   
  //   //   this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
  //   //     
  //   //     const stream = evt.stream as Stream;
  //   //     const id = this.getRemoteId(stream);
  //   //     if (!this.remoteCalls.length) {
  //   //       this.remoteCalls.push(id);
  //   //       setTimeout(() => stream.play(id), 1000);
  //   //     }
  //   //   });
  //   //this.router.navigate(['/remotejoin']);
  // }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    
    console.log("UID in publish", this.uid)

    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }
  // publishremote(): void {
  //   this.client.publish(this.remoteStream, err => console.log('Publish local stream error: ' + err));
  // }
  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  // private initRemoteStream(onSuccess?: () => any): void {
  //   
  //   this.remoteStream.init(
  //     () => {
  //       // The user has granted access to the camera and mic.
  //       this.remoteStream.play(this.remoteCallId);
  //       if (onSuccess) {
  //         onSuccess();
  //       }
  //     },
  //     err => console.error('getUserMedia failed', err)
  //   );
  // }
  private initLocalStream(onSuccess?: () => any): void {
    
    console.log("Here in initLocalStream")
    this.localStream.init(
      () => {
        
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        //this.client.leave();
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private assignClientHandlers(): void {
    
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });
    
    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });

    });
    
    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      console.log("Result", this.remoteCalls.some(rmid => rmid == id));
      if (!this.remoteCalls.some(rmid => rmid == id)) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }

      // if (!this.remoteCalls.length) {
      //this.remoteCalls.push(id);
      //   let unique = [...new Set(this.remoteCalls)];
      // this.remoteCalls=unique;
      // }
      // for (let index = 0; index <= this.remoteCalls.length; index++) {
      //   setTimeout(() => stream.play(this.remoteCalls[index]), 1000);
      // }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      
      console.log("Inside RemoteStreamRemoved");

      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });
    this.client.
      on(ClientEvent.PeerLeave, evt => {
        
        console.log("Inside PeerLeave");

        const stream = evt.stream as Stream;
        if (stream) {
          stream.stop();
          this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
          console.log(`${evt.uid} left from this channel`);
        }
      });
    //this.client.leave();
  }

  oncallEnd() {
    
    console.log("this.remoteCalls", this.remoteCalls)
    console.log("this.localStream", this.localStream)
    //this.localStream.stop();
    this.localStream.stop();
    this.localStream.close();
    this.client.leave()

    // this.localStream.play(this.localCallId);
    //this.client.leave();
    // this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
    //   
    //   const stream = evt.stream as Stream;
    //   if (stream) {
    //     stream.stop();
    //     this.remoteCalls = [];
    //     console.log(`Remote stream is removed ${stream.getId()}`);
    //   }
    // });

    // this.client.on(ClientEvent.PeerLeave, evt => {
    //   
    //   const stream = evt.stream as Stream;
    //   if (stream) {
    //     stream.stop();
    //     this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
    //     console.log(`${evt.uid} left from this channel`);
    //   }
    // });
  }
  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }
  private getLocalId(stream: Stream): string {
    return `agora_local-${stream.getId()}`;
  }
}
