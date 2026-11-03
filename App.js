
import React, { useState } from "react";
import {
  View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet,
  StatusBar, ScrollView, SafeAreaView
} from "react-native";

const logo = require("./assets/green-ghost-logo.jpg");

const tifos = [
  { id: 1, name: "GREEN GHOST", desc: "التيفو الرسمي", symbol: "👻" },
  { id: 2, name: "GREEN WALL", desc: "قريباً — أضف تصميمك", symbol: "🟩" },
  { id: 3, name: "GHOST ARMY", desc: "قريباً — أضف تصميمك", symbol: "🏴" },
  { id: 4, name: "ULTRAS 07", desc: "قريباً — أضف تصميمك", symbol: "💚" }
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedTifo, setSelectedTifo] = useState(1);
  const [energy, setEnergy] = useState(38);
  const [opponent, setOpponent] = useState(22);
  function enterMatch() {
    setScreen("match");
  }

  function cheer() {
    setEnergy(v => Math.min(100, v + 8));
    setOpponent(v => Math.max(0, v - 2));
  }

  function showHome() {
    setScreen("home");
  }

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar hidden />
      <View style={s.bgGlow} />
      {screen === "home" && (
        <View style={s.home}>
          <View style={s.topRow}>
            <Text style={s.smallPill}>🪙 50,000</Text>
            <Text style={s.smallPill}>⭐ 0</Text>
            <Text style={s.smallPill}>🏆 RANK #1</Text>
          </View>
          <View style={s.hero}>
            <Image source={logo} style={s.logo} resizeMode="contain" />
            <View style={s.heroText}>
              <Text style={s.kicker}>WELCOME TO THE TERRACE</Text>
              <Text style={s.title}>ULTRAS</Text>
              <Text style={s.titleGreen}>GREEN GHOST</Text>
              <Text style={s.subtitle}>أجواء أقوى .. جمهور أعظم 💚</Text>
              <TouchableOpacity style={s.playButton} onPress={enterMatch}>
                <Text style={s.playText}>▶  اللعب الآن</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={s.menuRow}>
            <TouchableOpacity style={s.menuButton} onPress={() => setScreen("tifos")}><Text style={s.menuIcon}>🏴</Text><Text style={s.menuText}>اختيار التيفو</Text></TouchableOpacity>
            <TouchableOpacity style={s.menuButton} onPress={() => setScreen("stadium")}><Text style={s.menuIcon}>🏟️</Text><Text style={s.menuText}>الملعب</Text></TouchableOpacity>
            <TouchableOpacity style={s.menuButton} onPress={() => setScreen("about")}><Text style={s.menuIcon}>👥</Text><Text style={s.menuText}>فريق الجمهور</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {screen === "match" && (
        <View style={s.match}>
          <View style={s.matchHeader}>
            <TouchableOpacity onPress={showHome}><Text style={s.back}>‹ القائمة</Text></TouchableOpacity>
            <Text style={s.matchTitle}>🟢 GREEN GHOST  <Text style={{color:"#fff"}}>VS</Text>  GUEST FANS ⚫</Text>
          </View>
          <View style={s.stands}>
            <View style={s.sky}><Text style={s.lights}>✦                         ✦                         ✦</Text></View>
            <View style={s.crowd}>
              {Array.from({length: 100}, (_,i) => <Text key={i} style={[s.fan, {color: i%3===0 ? "#eaffef" : (i%2===0 ? "#0bc65a" : "#06391d")}]}>{i%7===0 ? "⚑" : "●"}</Text>)}
            </View>
            <View style={s.banner}><Text style={s.bannerText}>GREEN GHOST</Text><Text style={s.bannerSub}>ULTRAS • NEVER GIVE UP</Text></View>
            <View style={s.pitch}><Text style={s.pitchLine}>◉</Text></View>
          </View>
          <View style={s.battleRow}>
            <View style={s.teamBox}>
              <Text style={s.teamName}>🟢 GREEN GHOST</Text>
              <View style={s.bar}><View style={[s.fill,{width:energy+"%"}]}/></View>
              <Text style={s.points}>{energy}% حماس المدرج</Text>
            </View>
            <View style={s.vs}><Text style={s.vsText}>VS</Text></View>
            <View style={s.teamBox}>
              <Text style={s.teamName}>GUEST FANS ⚫</Text>
              <View style={s.bar}><View style={[s.fillRed,{width:opponent+"%"}]}/></View>
              <Text style={s.points}>{opponent}% حماس المنافس</Text>
            </View>
          </View>
          <View style={s.actionRow}>
            <TouchableOpacity style={s.cheerButton} onPress={cheer}><Text style={s.cheerText}>👏 شجّع الجمهور!</Text></TouchableOpacity>
            <TouchableOpacity style={s.secondary} onPress={() => setScreen("tifos")}><Text style={s.secondaryText}>🏴 تغيير التيفو</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {screen === "tifos" && (
        <View style={s.subScreen}>
          <Text style={s.sectionTitle}>🏴 اختار التيفو ديالك</Text>
          <Text style={s.hint}>تقدر تزيد تصاميم التيفوهات ديالك من بعد.</Text>
          <View style={s.tifoGrid}>
            {tifos.map(t => (
              <TouchableOpacity key={t.id} onPress={() => setSelectedTifo(t.id)} style={[s.tifoCard, selectedTifo===t.id && s.tifoSelected]}>
                <Text style={s.tifoSymbol}>{t.symbol}</Text><Text style={s.tifoName}>{t.name}</Text><Text style={s.tifoDesc}>{t.desc}</Text>
                {selectedTifo===t.id && <Text style={s.selected}>✓ مختار</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.playButton} onPress={() => setScreen("home")}><Text style={s.playText}>رجوع للقائمة</Text></TouchableOpacity>
        </View>
      )}

      {screen === "stadium" && (
        <View style={s.subScreen}>
          <Text style={s.sectionTitle}>🏟️ ملعب Green Ghost</Text>
          <Text style={s.hint}>المدرج الأخضر هو معقل Green Ghost.</Text>
          <View style={s.stadiumCard}><Text style={{fontSize:65}}>🏟️</Text><Text style={s.bannerText}>GREEN GHOST ARENA</Text><Text style={s.hint}>ملعب تجريبي — ملاعب أخرى قريباً</Text></View>
          <TouchableOpacity style={s.playButton} onPress={() => setScreen("home")}><Text style={s.playText}>رجوع للقائمة</Text></TouchableOpacity>
        </View>
      )}

      {screen === "about" && (
        <View style={s.subScreen}>
          <Image source={logo} style={s.aboutLogo} resizeMode="contain"/>
          <Text style={s.sectionTitle}>فريق ULTRAS GREEN GHOST</Text>
          <Text style={s.hint}>دخل للمدرج، اختار التيفو، وشجّع الفريق ديالك!</Text>
          <TouchableOpacity style={s.playButton} onPress={() => setScreen("home")}><Text style={s.playText}>رجوع للقائمة</Text></TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:"#04130b"},
  bgGlow:{position:"absolute",top:-100,left:"25%",width:500,height:300,backgroundColor:"#075b2b",opacity:.22,borderRadius:300},
  home:{flex:1,paddingHorizontal:28,paddingVertical:12,justifyContent:"space-between"},
  topRow:{flexDirection:"row",justifyContent:"flex-end",gap:12},
  smallPill:{color:"#fff",backgroundColor:"#10291b",borderColor:"#1d9b4d",borderWidth:1,borderRadius:18,paddingHorizontal:15,paddingVertical:7,fontWeight:"bold"},
  hero:{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:28},
  logo:{width:"36%",height:"90%",maxWidth:310},
  heroText:{alignItems:"flex-start",minWidth:300},
  kicker:{color:"#9bc6a8",fontSize:12,letterSpacing:3,fontWeight:"bold"},
  title:{color:"#fff",fontSize:38,fontWeight:"900",letterSpacing:3},
  titleGreen:{color:"#12d65b",fontSize:39,fontWeight:"900",letterSpacing:1},
  subtitle:{color:"#d9f5e2",fontSize:18,marginTop:8,marginBottom:16,fontWeight:"bold"},
  playButton:{backgroundColor:"#08a943",borderColor:"#8bffad",borderWidth:2,borderRadius:15,paddingVertical:13,paddingHorizontal:35,alignItems:"center",minWidth:190,shadowColor:"#00ff66",shadowOpacity:.4,shadowRadius:12,elevation:8},
  playText:{color:"#fff",fontSize:20,fontWeight:"900"},
  menuRow:{flexDirection:"row",justifyContent:"center",gap:14,marginBottom:6},
  menuButton:{backgroundColor:"#0b2114",borderColor:"#187c3c",borderWidth:1,borderRadius:12,paddingVertical:10,paddingHorizontal:24,alignItems:"center",minWidth:145},
  menuIcon:{fontSize:22},menuText:{color:"#fff",fontSize:15,fontWeight:"bold",marginTop:3},
  match:{flex:1,paddingHorizontal:22,paddingVertical:8,justifyContent:"space-between"},
  matchHeader:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  back:{color:"#b8f5c9",fontSize:16,fontWeight:"bold"},matchTitle:{color:"#18d65c",fontSize:20,fontWeight:"900"},
  stands:{height:"53%",backgroundColor:"#092916",borderRadius:14,overflow:"hidden",borderWidth:1,borderColor:"#1b8b46"},
  sky:{height:"16%",backgroundColor:"#102a1c",justifyContent:"center"},lights:{color:"#e6ffe9",textAlign:"center",fontSize:23},
  crowd:{height:"38%",backgroundColor:"#061b10",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",paddingHorizontal:8},
  fan:{fontSize:18,width:"5%",textAlign:"center",lineHeight:24},
  banner:{height:"29%",backgroundColor:"#e7eee9",marginHorizontal:12,justifyContent:"center",alignItems:"center",borderWidth:3,borderColor:"#111"},
  bannerText:{fontSize:34,color:"#07190d",fontWeight:"900",letterSpacing:4},bannerSub:{color:"#14783a",fontSize:12,fontWeight:"900",letterSpacing:3},
  pitch:{flex:1,backgroundColor:"#087b36",justifyContent:"center",alignItems:"center",borderTopWidth:3,borderColor:"#d8f7df"},pitchLine:{color:"#b8f4c7",fontSize:34},
  battleRow:{flexDirection:"row",alignItems:"center",gap:12},teamBox:{flex:1},teamName:{color:"#fff",fontWeight:"900",fontSize:14,marginBottom:5},bar:{height:13,backgroundColor:"#263b2d",borderRadius:10,overflow:"hidden"},fill:{height:"100%",backgroundColor:"#11d45b"},fillRed:{height:"100%",backgroundColor:"#b6b6b6"},points:{color:"#c5e8d0",fontSize:12,marginTop:3},vs:{paddingHorizontal:6},vsText:{color:"#fff",fontSize:20,fontWeight:"900"},
  actionRow:{flexDirection:"row",justifyContent:"center",gap:12},cheerButton:{backgroundColor:"#08a943",paddingVertical:13,paddingHorizontal:24,borderRadius:12},cheerText:{color:"#fff",fontSize:17,fontWeight:"900"},secondary:{backgroundColor:"#10291b",borderWidth:1,borderColor:"#27884a",paddingVertical:12,paddingHorizontal:18,borderRadius:12},secondaryText:{color:"#fff",fontWeight:"bold",fontSize:14},
  subScreen:{flex:1,alignItems:"center",justifyContent:"center",padding:20},sectionTitle:{color:"#16d65b",fontSize:28,fontWeight:"900",marginBottom:8},hint:{color:"#c4dfcd",fontSize:15,marginBottom:16,textAlign:"center"},tifoGrid:{flexDirection:"row",gap:14,marginVertical:15},tifoCard:{width:170,backgroundColor:"#102719",borderWidth:1,borderColor:"#286a40",borderRadius:14,padding:14,alignItems:"center"},tifoSelected:{borderColor:"#20f36b",borderWidth:3},tifoSymbol:{fontSize:40},tifoName:{color:"#fff",fontWeight:"900",fontSize:16,marginTop:8},tifoDesc:{color:"#b9d9c3",fontSize:11,marginTop:5,textAlign:"center"},selected:{color:"#2aff77",fontWeight:"bold",marginTop:8},stadiumCard:{backgroundColor:"#102719",padding:30,borderRadius:20,alignItems:"center",marginBottom:18,borderColor:"#258c49",borderWidth:1},aboutLogo:{width:160,height:160,marginBottom:8},aboutLogo2:{width:150,height:150}
});
