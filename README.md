# Progetto di base nuovo sito

Progetto di base con diversi componenti utilizzabili singolarmente.

La cartella "html" contiene il codice generato dai "jsp" tramite l'utilizzo di wget.

Il batch che scarica il sito locale e crea gli html, crea questi nuovi file in una cartella temporanea con data e ora di creazione.

Gli altri script della cartella batch servono per convertire i jsp in file php funzionanti a parte per la prima riga di jsp che va rimossa a mano tramite editor con funzione trova sostituisci.

Il file di supporto per la sostituzione sostituisce a righe alterne una riga (di codice jsp) con la successiva (che è php)

Il codice è suddiviso in cartelle:

- nella cartella css si trovano tutti i css usati suddivisi per generici e per i singoli componenti
- nella cartella js vi si trovano tutti i javascript suddivisi per i diversi componenti
- i plugin JavaScript importati sono nella cartella plugin
- nella cartella includes ci sono file che vengono importati dai file php e jsp per parti di codice html comuni in tutte le pagine
- nella cartella data si trovano alcuni json che servono per testare il funzionamento di alcuni componenti (gallery, eventi, search, ecc..)


