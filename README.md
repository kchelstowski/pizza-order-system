# Pizza ordering system

### Data wykonania: styczeń-luty 2022 r.

### Cel: 
* samodzielna nauka podstaw TypeScripta w Reacie + Redux

### Użyte technologie/biblioteki:
* React, Redux
* TypeScript
* Primereact (biblioteka UI)
* axios
* MongoDB (stworzenie własnego API)
* formik + yup
* react-router-dom v6
* lodash
* redux-thunk
* bcrypt (do szyfrowania haseł w bazie danych)
* js-cookies

### Opis:
Aplikacja ma być symulacją systemu do zamawiania pizzy. Wyróżniamy w niej trzy encje: produkty, użytkownicy, zamówienia.
Wszystko łączy się z bazą danych MongoDB, dla której API napisałem samodzielnie, a serwer postawiłem w chmurze MongoDB Atlas, aby każdy odwiedzający ten projekt mógł odpalić projekt bez konieczności instalacji MongoDB na swoim urządzeniu czy też Dockerze.
Aplikacja dysponuje systemem rejestracji i logowania użytkowników - po uruchomieniu możemy stworzyć swoje konto, a następnie za pomocą podanego loginu i hasła zalogować się do systemu.
Będąc zalogowanym możemy złożyć zamówienie, a następnie obserwować status swojego zamówienia, który zmienia `admin`.
Z pozycji "zwykłego" użytkownika możemy jeszcze przejść do widoku swoich aktualnych zamówień/historycznych zamówień (Completed), a także edytować swoje konto, w tym hasło.

Jako admin możemy natomiast zarządzać użytkownikami (ustawiać/zdejmować prawa roota (administratora) dla danego użytkownika), zmieniać statusy zamówień, przeglądać statystyki, dodawać nowy produkt do bazy, usuwać, edytować, zmieniać ilość na stanie (po każdym zamówieniu ilość danego produktu jest <ins>dekrementowana</ins> o 1, aby móc oszacować ile produktów mamy na stanie i na ile pizz nam danego produktu wystarczy)

Do przechowywania informacji o aktualnie zalogowanym użytkowniku wykorzystuję js-cookies pod kluczem `username`.
Mimo że nie było to celem tego projektu, to starałem się też w <ins>większości</ins> miejsc uwzględnić wyjątki, np. niezalogowany użytkownik nie może bezpośrednio wpisać ścieżki `/orders/form` i czegoś zamówić itp lub wyjątek typu, że użytkownik "zwykły" nie może przejść do zarządzania stanem zamówień lub zarządzania innymi użytkownikami.

### Z czego jestem zadowolony?
Zadowolony jestem z tego, że w krótkim czasie udało mi się (przynajmniej tak mi się wydaje) przyswoić podstawy TypeScriptu i użyć go od razu w połączeniu z Reactem i Reduxem.

### Z czego nie jestem zadowolony?
Standardowo średnio jestem zadowolony ze stylowania, nie jest to moja najlepsza strona, jednak w porównaniu do poprzednich projektów starałem się, aby wyglądało to przystępnie i nie było problemów z poruszaniem się po aplikacji wedle zasady "Nie każ mi myśleć".


## Jak uruchomić aplikację?
Po sklonowaniu repozytorium należy najpierw zainstalować wszystko za pomocą `npm install`, a następnie w jednym terminalu połączyć się z bazą danych. 
Będąc w folderze `API` łączymy się z bazą poleceniem:

    node index.js
Jeśli pojawi nam się informacja `Connected to MongoDB` to wszystko jest w porządku.

Aplikację natomiast uruchamiamy w drugim terminalu będąc w głównym folderze projektu za pomocą:

    npm start

Każdy z korzystających łączy się z tą samą bazą - kolekcją, więc wszystkie wprowadzone przez Was dane, np. stworzenie nowego użytkownika będzie widoczne dla wszystkich - można skorzystać z innej kolekcji, wtedy w pliku `index.js` w folderze `API` w poleceniu
`mongoose.connect` należy zamienić słowo kluczowe `mongodb.net/myFirstDatabase` `myFirstDatabase` na dowolne przez siebie wymyślone.
Tworząc nowego użytkownika mimo że hasła są szyfrowane, to zalecam ze względów bezpieczeństwa na stworzenie jakichś prostych, np. 123, jako że nie ustawiałem żadnej walidacji do hasła.

#### Lista podstawowych użytkowników:
loginy: User1, User2, User3, User4, admin (prawa administratora)

Hasła do wszystkich kont to `123`.

Stworzyłem (zaimportowałem z pliku `products.json` w `API/example_data`) kilka produktów, aby móc od razu coś "zamówić". Na rzecz testów (między innymi statystyk) stworzyłem też ręcznie kilka zamówień.
Domyślnie sekcja `Orders->Current` będzie prawdopodobnie pusta, ponieważ w `Current` są zamówienia, które nie zostały jeszcze zakończone (nie mają statusu Completed), a przy testowaniu status wszystkich zamówień starałem się zmieniać na `Completed`.
