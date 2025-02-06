// プラグイン関数
function getClientInfo() {
    return {
        "name" : SV.T("Replace Lyrics syllables With japanese"),
        "author" : "hikanashi",
        "versionNumber" : 0.01,
        "minEditorVersion" : 65537,
        "category" : "Lyrics"
    };
}

// 翻訳関数
function getTranslations(langCode) {
    if(langCode == "ja-jp") {
        return [
            ["Replace Lyrics syllables With japanese", "歌詞のシラブルを日本語に置き換える"],
        ];
    }
    return [];
}

function main() {
    // 変換表
    const syllableReplacementTable = [
        ["ah","あ"],
        ["ba","ば"],
        ["va","ば"],
        ["ban","ばん"],
        ["van","ばん"],
        ["da","だ"],
        ["dan","だん"],
        ["ha","は"],
        ["hah","は"],
        ["han","は"],
        ["fah","ふぁ"],
        ["la","ら"],
        ["ra","ら"],
        ["lan","らん"],
        ["ran","らん"],
        ["ta","た"],
        ["na","な"],
        ["pa","ぱ"],
        ["pan","ぱん"],
        ["pam","ぱん"],
        ["sha","しゃ"],
        ["wa","わ"],
        ["wah","わ"],
        ["wha","わ"],
        ["ya","や"],

        ["ih","ぃ"],
        ["li","り"],
        ["ti","てぃ"],
        ["di","でぃ"],
        ["wee","うぃ"],
        ["yeah","いぇ"],
        
        ["oo","う"],
        ["uh","う"],
        ["fu","ふ"],
        ["hoo","ふ"],
        ["shu","しゅ"],
        ["to","とぅ"],
        ["tu","とぅ"],
        ["too","とぅ"],
        ["tm","とぅん"],
        ["tn","とぅん"],
        ["tun","とぅん"],
        ["tum","とぅん"],
        ["d","どぅっ"],
        ["do","どぅ"],
        ["du","どぅ"],
        ["doo","どぅ"],
        ["doot","どぅっ"],
        ["dm","どぅん"],
        ["dn","どぅん"],
        ["lu","る"],
        ["ru","る"],
        ["lm","るん"],
        ["loo","る"],
        ["loot","るっ"],
        ["n","ん"],
        ["hn","ん"],
        ["hm","ん"],
        ["hun","ふん"],
        ["hum","ふん"],


        ["pe","ぺ"],
        ["hey","へい"],
        
        ["oh","お"],
        ["ohi","おーぃ"],
        ["doh","どぉ"],
        ["ho","ほ"],
        ["woh","うぉ"],
        ["woo","うぉ"],
        ["whoo","うぉ"],
        ["fon","ふぉん"],
        ["fom","ふぉん"],
        ["pon","ぽん"],
        ["pom","ぽん"],
        ["pn","ぽん"],
        ["pm","ぽん"],
    
    ];

    // NoteGroupを取得
    var scope = SV.getMainEditor().getCurrentGroup();
    var group = scope.getTarget();
    
    for (var n = 0; n < group.getNumNotes();) {
        var note = group.getNote(n);
        n++;
        if(changeLyric(note, syllableReplacementTable) != true){
            break;
        }
    }

    SV.finish();
}


// シラブル変換処理
// 変換処理を継続するならtrue
function changeLyric(note, replaceTable) {

    var lyric = note.getLyrics();
    lyric = lyric.toLowerCase().replace(/(-|_|\(|\)|ー|―|‐|－|～|!|！)/, '');


    var changeValue = "";
    // シラブル置き換え対象外の場合は処理しない
    for(var i = 0; i < replaceTable.length; i++) {
        var target = replaceTable[i];

        if(target[0] == lyric) {
            changeValue = target[1];
            break; 
        }
    }

    if(changeValue.length < 1) {
        return true;
    }

    // シラブルで置き換える
    note.setLyrics(changeValue);
    note.setPhonemes("");
    return true;

}