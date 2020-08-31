import firebase from "firebase"
import "@firebase/firestore";
import { SnapshotViewIOS } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyASIDSD1v413qq8p6jrJzsWGbh706KcMJI",
    authDomain: "easysolarapp-d8ed8.firebaseapp.com",
    databaseURL: "https://easysolarapp-d8ed8.firebaseio.com",
    projectId: "easysolarapp-d8ed8",
    storageBucket: "easysolarapp-d8ed8.appspot.com",
    messagingSenderId: "523102842486",
    appId: "1:523102842486:web:9b30d544c27d9d7a4c7957"
}

class Fire {
     constructor(Callback) {
         this.init(Callback)
     }
    init(callback) {
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        })
    }

    getLists(callback) {
       let ref = this.ref.orderBy("name")

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }
    

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection("lists")
    }

    datach() {
        this.unsubscribe();
    }
}


export default Fire;