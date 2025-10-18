window.RULES_PAYLOAD = {
  id: 'adjectives_comparison',
  title: 'Степени сравнения прилагательных',
  rules: `
  <div class="rule-container">
    <h1>Степени сравнения польских прилагательных</h1>
    <h2>Три степени сравнения (STOPIEŃ)</h2>
    <table>
      <thead>
        <tr>
          <th>Степень</th>
          <th>Название</th>
          <th>Пример</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Równy</td>
          <td>Положительная</td>
          <td>ciekawy</td>
        </tr>
        <tr>
          <td>Wyższy</td>
          <td>Сравнительная</td>
          <td>ciekaw<span class="highlight">szy</span></td>
        </tr>
        <tr>
          <td>Najwyższy</td>
          <td>Превосходная</td>
          <td><span class="highlight">naj</span>ciekawszy</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <h2>1. Регулярные прилагательные (REGULARNE)</h2>
    <h3>Базовые окончания:</h3>
    <ul>
      <li><strong>na -szy</strong> → ciekawy → ciekaw<span class="highlight">szy</span> → <span class="highlight">naj</span>ciekawszy</li>
      <li><strong>na -ejszy</strong> → nudny → nudn<span class="highlight">iejszy</span> → <span class="highlight">naj</span>nudniejszy</li>
    </ul>
    <h3>a) Чередование согласных (Wymiany spółgłosek)</h3>
    <table>
      <thead>
        <tr>
          <th>Чередование</th>
          <th>Положительная</th>
          <th>Сравнительная</th>
          <th>Превосходная</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>m</strong> / <strong>mi</strong></td>
          <td>uprzejmy</td>
          <td>uprzej<span class="highlight">mi</span>ejszy</td>
          <td>najuprzej<span class="highlight">mi</span>ejszy</td>
        </tr>
        <tr>
          <td><strong>n</strong> / <strong>ń</strong></td>
          <td>cienki</td>
          <td>cie<span class="highlight">ń</span>szy</td>
          <td>najcie<span class="highlight">ń</span>szy</td>
        </tr>
        <tr>
          <td><strong>n</strong> / <strong>ni</strong></td>
          <td>ładny</td>
          <td>ład<span class="highlight">ni</span>ejszy</td>
          <td>najład<span class="highlight">ni</span>ejszy</td>
        </tr>
        <tr>
          <td><strong>r</strong> / <strong>rz</strong></td>
          <td>mądry</td>
          <td>mąd<span class="highlight">rz</span>ejszy</td>
          <td>najmąd<span class="highlight">rz</span>ejszy</td>
        </tr>
        <tr>
          <td><strong>l</strong> / <strong>l</strong></td>
          <td>miły</td>
          <td>mi<span class="highlight">l</span>szy</td>
          <td>najmi<span class="highlight">l</span>szy</td>
        </tr>
        <tr>
          <td><strong>g</strong> / <strong>ż</strong></td>
          <td>drogi</td>
          <td>dro<span class="highlight">ż</span>szy</td>
          <td>najdro<span class="highlight">ż</span>szy</td>
        </tr>
        <tr>
          <td><strong>s</strong> / <strong>ż</strong></td>
          <td>bliski</td>
          <td>bli<span class="highlight">ż</span>szy</td>
          <td>najbli<span class="highlight">ż</span>szy</td>
        </tr>
        <tr>
          <td><strong>st</strong> / <strong>ści</strong></td>
          <td>gęsty</td>
          <td>gę<span class="highlight">ści</span>ejszy</td>
          <td>najgę<span class="highlight">ści</span>ejszy</td>
        </tr>
        <tr>
          <td><strong>sn</strong> / <strong>śni</strong></td>
          <td>jasny</td>
          <td>ja<span class="highlight">śni</span>ejszy</td>
          <td>najja<span class="highlight">śni</span>ejszy</td>
        </tr>
        <tr>
          <td><strong>sl</strong> / <strong>śl</strong></td>
          <td>dorosły</td>
          <td>doro<span class="highlight">śl</span>ejszy</td>
          <td>najdoro<span class="highlight">śl</span>ejszy</td>
        </tr>
      </tbody>
    </table>
    <h3>b) Чередование гласных (Wymiany samogłosek)</h3>
    <table>
      <thead>
        <tr>
          <th>Чередование</th>
          <th>Положительная</th>
          <th>Сравнительная</th>
          <th>Превосходная</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>a</strong> / <strong>e</strong></td>
          <td>biały</td>
          <td>bi<span class="highlight">e</span>lszy</td>
          <td>najbi<span class="highlight">e</span>lszy</td>
        </tr>
        <tr>
          <td><strong>o</strong> / <strong>e</strong></td>
          <td>wesoły</td>
          <td>wes<span class="highlight">e</span>lszy</td>
          <td>najwes<span class="highlight">e</span>lszy</td>
        </tr>
        <tr>
          <td><strong>ą</strong> / <strong>ę</strong></td>
          <td>gorący</td>
          <td>gor<span class="highlight">ę</span>tszy</td>
          <td>najgor<span class="highlight">ę</span>tszy</td>
        </tr>
      </tbody>
    </table>
    <h3>c) Редукция (Redukcja)</h3>
    <p>Выпадение части основы перед окончанием:</p>
    <table>
      <thead>
        <tr>
          <th>Тип</th>
          <th>Положительная</th>
          <th>Сравнительная</th>
          <th>Превосходная</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>-ki</strong></td>
          <td>krót<span class="highlight">ki</span></td>
          <td>krótszy</td>
          <td>najkrótszy</td>
        </tr>
        <tr>
          <td><strong>-oki</strong></td>
          <td>szero<span class="highlight">ki</span></td>
          <td>szerszy</td>
          <td>najszerszy</td>
        </tr>
        <tr>
          <td><strong>-eki</strong></td>
          <td>dale<span class="highlight">ki</span></td>
          <td>dalszy</td>
          <td>najdalszy</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <h2>2. Нерегулярные прилагательные (NIEREGULARNE)</h2>
    <p>Четыре важнейших исключения:</p>
    <table class="irregular">
      <thead>
        <tr>
          <th>Положительная</th>
          <th>Сравнительная</th>
          <th>Превосходная</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>dobry</strong> (хороший)</td>
          <td><strong>lepszy</strong></td>
          <td><strong>najlepszy</strong></td>
        </tr>
        <tr>
          <td><strong>zły</strong> (плохой)</td>
          <td><strong>gorszy</strong></td>
          <td><strong>najgorszy</strong></td>
        </tr>
        <tr>
          <td><strong>mały</strong> (маленький)</td>
          <td><strong>mniejszy</strong></td>
          <td><strong>najmniejszy</strong></td>
        </tr>
        <tr>
          <td><strong>duży / wielki</strong> (большой)</td>
          <td><strong>większy</strong></td>
          <td><strong>największy</strong></td>
        </tr>
      </tbody>
    </table>
    <div class="rule-box">
      <h2>📝 Основные правила</h2>
      <ol>
        <li><strong>Превосходная степень</strong> = <span class="highlight">naj</span> + сравнительная степень</li>
        <li>Чередования применяются <strong>автоматически</strong> при добавлении окончаний</li>
        <li>Окончание <strong>-ejszy</strong> используется после мягких согласных</li>
        <li>Окончание <strong>-szy</strong> используется после твёрдых согласных</li>
        <li>Нерегулярные прилагательные нужно <strong>заучивать наизусть</strong></li>
      </ol>
    </div>
  </div>
`,
  words: [
    { front: "Lublin jest ___________ (mały) miastem niż Wrocław.", back: "mniejszy" },
    { front: "Tatry to ___________ (wysoki) góry w Polsce.", back: "najwyższe" },
    { front: "Woda w Bałtyku jest ___________ (zimny) niż w Morzu Śródziemnym.", back: "zimniejsza" },
    { front: "Toruń jest miastem ___________ (stary) nawet od Krakowa.", back: "starszym" },
    { front: "Arkadius jest ___________ (kontrowersyjny) polskim projektantem mody.", back: "najbardziej kontrowersyjnym" },
    { front: "Wisła jest ___________ (długi) polską rzeką.", back: "najdłuższą" },
    { front: "Lech Wałęsa jest ___________ (znany) na świecie polskim laureatem Nagrody Nobla.", back: "najbardziej znanym" },
    { front: "Warszawskie ulice są ___________ (szeroki) od krakowskich.", back: "szersze" },
    { front: "Kościół Mariacki w Krakowie jest ___________ (wysoki) niż Sukiennice.", back: "wyższy" },
    { front: "\\\"Nike\\\" jest ___________ (prestiżowy) nagrodą literacką w Polsce.", back: "najbardziej prestiżową" },
    { front: "Sytuacja materialna mieszkańców wsi jest ___________ (zły) niż mieszkańców miast.", back: "gorsza" },
    { front: "Ten film jest ___________ (ciekawy) niż poprzedni.", back: "ciekawszy" },
    { front: "To jest ___________ (nudny) książka, jaką czytałem.", back: "najnudniejsza" },
    { front: "Ona jest ___________ (uprzejmy) osobą w naszym biurze.", back: "najuprzejmiejszą" },
    { front: "Ten materiał jest ___________ (cienki) od tamtego.", back: "cieńszy" },
    { front: "Twój pokój jest ___________ (ładny) niż mój.", back: "ładniejszy" },
    { front: "Einstein był ___________ (mądry) naukowcem swojej epoki.", back: "najmądrzejszym" },
    { front: "To jest ___________ (miły) prezent, jaki dostałem.", back: "najmilszy" },
    { front: "Złoto jest ___________ (drogi) niż srebro.", back: "droższe" },
    { front: "Moja szkoła jest ___________ (bliski) niż twoja.", back: "bliższa" },
    { front: "To jest ___________ (gęsty) las w okolicy.", back: "najgęstszy" },
    { front: "Dzisiaj jest ___________ (jasny) dzień niż wczoraj.", back: "jaśniejszy" },
    { front: "Mój brat jest ___________ (dorosły) ode mnie.", back: "dorosłszy" },
    { front: "Śnieg jest ___________ (biały) niż mleko.", back: "bielszy" },
    { front: "Klown był ___________ (wesoły) osobą na przyjęciu.", back: "najweselszą" },
    { front: "Ta zupa jest ___________ (gorący) niż herbata.", back: "gorętsza" },
    { front: "To jest ___________ (krótki) droga do centrum.", back: "najkrótsza" },
    { front: "Ta ulica jest ___________ (szeroki) od poprzedniej.", back: "szersza" },
    { front: "Księżyc jest ___________ (daleki) niż samolot.", back: "dalszy" },
    { front: "Ten rok był ___________ (dobry) w moim życiu.", back: "najlepszy" },
    { front: "Ta wiadomość jest ___________ (zły) niż myślałem.", back: "gorsza" },
    { front: "To jest ___________ (mały) pudełko w sklepie.", back: "najmniejsze" },
    { front: "Słoń jest ___________ (duży) niż koń.", back: "większy" },
    { front: "Ta kawa jest ___________ (mocny) od tamtej.", back: "mocniejsza" },
    { front: "On jest ___________ (silny) zawodnikiem w drużynie.", back: "najsilniejszym" },
    { front: "To zadanie jest ___________ (słaby) niż poprzednie.", back: "słabsze" },
    { front: "To jest ___________ (czysty) pokój w hotelu.", back: "najczystszy" },
    { front: "Ulice są ___________ (brudny) po deszczu.", back: "brudniejsze" },
    { front: "To jest ___________ (nowy) model telefonu.", back: "najnowszy" },
    { front: "Ten budynek jest ___________ (stary) w mieście.", back: "najstarszy" },
    { front: "Ona jest ___________ (młody) niż jej siostra.", back: "młodsza" },
    { front: "Bill Gates jest ___________ (bogaty) niż ja.", back: "bogatszy" },
    { front: "Ta rodzina jest ___________ (biedny) w naszej wsi.", back: "najbiedniejsza" },
    { front: "Gepard jest ___________ (szybki) zwierzęciem na świecie.", back: "najszybszym" },
    { front: "Żółw jest ___________ (wolny) od zająca.", back: "wolniejszy" },
    { front: "Mount Everest jest ___________ (wysoki) górą na świecie.", back: "najwyższą" },
    { front: "Ten dom jest ___________ (niski) od tego.", back: "niższy" },
    { front: "Ta droga jest ___________ (długi) niż tamta.", back: "dłuższa" },
    { front: "Te warzywa są ___________ (świeży) od tamtych.", back: "świeższe" },
    { front: "Dzisiaj jest ___________ (ciepły) niż wczoraj.", back: "cieplej" },
    { front: "Zima jest ___________ (zimny) porą roku.", back: "najzimniejszą" },
    { front: "Diament jest ___________ (twardy) od szkła.", back: "twardszy" },
    { front: "Poduszka jest ___________ (miękki) od krzesła.", back: "miększa" },
    { front: "Piórko jest ___________ (lekki) od kamienia.", back: "lżejsze" },
    { front: "To jest ___________ (ciężki) walizka.", back: "najcięższa" },
    { front: "Ten człowiek jest ___________ (gruby) niż tamten.", back: "grubszy" },
    { front: "Ta linia jest ___________ (cienki) od tamtej.", back: "cieńsza" },
    { front: "To jest ___________ (szeroki) rzeka w Polsce.", back: "najszersza" },
    { front: "Ta uliczka jest ___________ (wąski) w mieście.", back: "najwęższa" },
    { front: "Szklanka jest ___________ (pełny) wody.", back: "pełna" },
    { front: "Ten słoik jest ___________ (pusty) niż tamten.", back: "pustszy" },
    { front: "Dzień jest ___________ (jasny) niż noc.", back: "jaśniejszy" },
    { front: "Ta piwnica jest ___________ (ciemny) pomieszczeniem.", back: "najciemniejszym" },
    { front: "Ten nóż jest ___________ (ostry) od tego.", back: "ostrzejszy" },
    { front: "Ten ołówek jest ___________ (tępy) niż tamten.", back: "tępszy" },
    { front: "Pustynia jest ___________ (suchy) niż las.", back: "suchsza" },
    { front: "To jest ___________ (mokry) dzień w tym miesiącu.", back: "najmokrzejszy" },
    { front: "Ta linia jest ___________ (prosty) niż tamta.", back: "prostsza" },
    { front: "Ta droga jest ___________ (krzywy) od poprzedniej.", back: "krzywsza" },
    { front: "To szkło jest ___________ (gładki) niż papier.", back: "gładsze" },
    { front: "Ten materiał jest ___________ (szorstki) od jedwabiu.", back: "szorstszy" },
    { front: "Ten las jest ___________ (gęsty) w regionie.", back: "najgęstszy" },
    { front: "Jej włosy są ___________ (rzadki) niż moje.", back: "rzadsze" },
    { front: "Ten nauczyciel jest ___________ (surowy) od tamtego.", back: "surowszy" },
    { front: "To jest ___________ (dokładny) pomiar.", back: "najdokładniejszy" },
    { front: "On jest ___________ (śmiały) żołnierzem w plutonie.", back: "najśmielszym" },
    { front: "Ta kobieta jest ___________ (piękny) niż tamta.", back: "piękniejsza" },
    { front: "To jest ___________ (brzydki) budynek w mieście.", back: "najbrzydszy" },
    { front: "On jest ___________ (mądry) niż myślałem.", back: "mądrzejszy" },
    { front: "To jest ___________ (głupi) pomysł, jaki słyszałem.", back: "najgłupszy" },
    { front: "Ta droga jest ___________ (bezpieczny) od tamtej.", back: "bezpieczniejsza" },
    { front: "To jest ___________ (niebezpieczny) miejsce w mieście.", back: "najniebezpieczniejsze" },
    { front: "Ta herbata jest ___________ (słodki) niż kawa.", back: "słodsza" },
    { front: "Ta cytryna jest ___________ (kwaśny) od pomarańczy.", back: "kwaśniejsza" },
    { front: "Ten ser jest ___________ (słony) niż tamten.", back: "słoniejszy" },
    { front: "Ta papryka jest ___________ (ostry) w sklepie.", back: "najostrzejsza" },
    { front: "To jest ___________ (smaczny) potrawa na świecie.", back: "najsmaczniejsza" },
    { front: "Ta historia jest ___________ (dziwny) niż poprzednia.", back: "dziwniejsza" },
    { front: "To jest ___________ (normalny) sytuacja.", back: "normalna" },
    { front: "On jest ___________ (szczęśliwy) człowiekiem, jakiego znam.", back: "najszczęśliwszym" },
    { front: "Ta wiadomość jest ___________ (smutny) niż myślałem.", back: "smutniejsza" },
    { front: "To jest ___________ (wesoły) film tego roku.", back: "najweselszy" },
    { front: "Ta muzyka jest ___________ (głośny) od tamtej.", back: "głośniejsza" },
    { front: "W bibliotece jest ___________ (cichy) niż na ulicy.", back: "ciszej" },
    { front: "To jest ___________ (ważny) informacja.", back: "najważniejsza" },
    { front: "Ta sprawa jest ___________ (pilny) od tamtej.", back: "pilniejsza" },
    { front: "On jest ___________ (leniwy) studentem w klasie.", back: "najleniwszym" },
    { front: "Ona jest ___________ (pracowity) niż jej kolega.", back: "pracowitszy" },
    { front: "To jest ___________ (tani) sklep w okolicy.", back: "najtańszy" },
    { front: "Ta restauracja jest ___________ (drogi) w mieście.", back: "najdroższa" }
  ]
};
