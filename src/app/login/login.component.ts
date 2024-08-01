import { Component, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  #auth = inject(Auth);
  signUpForm = {
    email: '',
    password: '',
  };

  onSignUp = () => {
    createUserWithEmailAndPassword(
      this.#auth,
      this.signUpForm.email,
      this.signUpForm.password,
    )
      .then(userCredential => {
        const user = userCredential.user;
        console.log('user signed up', user);
      })
      .catch(err => {
        console.log('signup error', err.code, err.message);
      });
  };

  onSignIn = () => {
    signInWithEmailAndPassword(this.#auth, 'email', 'pwd')
      .then(userCredential => {
        console.log(userCredential.user);
      })
      .catch(err => {
        console.log(err.code, err.message);
      });
  };
}
