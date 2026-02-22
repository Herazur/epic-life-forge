

# 🗡️ Solo Leveling - Gerçek Hayat RPG Sistemi

Hayatınızı bir RPG oyununa dönüştüren, Solo Leveling temalı koyu/neon tasarımlı bir web uygulaması.

---

## 1. Ana Dashboard (Oyuncu Durum Penceresi)
- Karakter adı, seviye ve sıralama (E → S Rank) gösterimi
- Animasyonlu XP deneyim çubuğu (seviye atlama efektleri ile)
- Altın bakiyesi göstergesi
- HP (Can) çubuğu (ceza sistemiyle bağlantılı)
- 5 temel stat gösterimi: Kuvvet, Zeka, Disiplin, Karizma, Beceri
- Solo Leveling tarzı koyu tema, mavi-mor neon parıltılar

## 2. Görev Sistemi (Quest System)
- **Günlük Görevler**: Hazır şablonlar (100 şınav, 30 dk okuma vb.) + kullanıcı özel görevleri
- **Yan Görevler**: Konfor alanından çıkma görevleri, daha yüksek XP ödülleri
- **Boss Savaşları**: Haftalık zorluklar, büyük XP ve altın ödülleri
- Görev tamamlama, ilerleme takibi ve geri sayım zamanlayıcıları
- Her görev kategorisine özel XP ve altın ödül miktarları

## 3. Beceri Ağacı (Skill Tree)
- Görsel düğüm (node) tabanlı beceri haritası
- Kodlama, spor, dil öğrenme gibi alanlarda ilerleme dalları
- Kilidi açılmış ve kilitli düğümler arasında görsel fark
- Seviye ilerledikçe yeni beceri dalları açılır

## 4. Pazar Yeri ve Envanter
- Altınla "satın alınabilen" ödüller (30 dk oyun, film gecesi vb.)
- Kullanıcının kendi ödüllerini tanımlayabilmesi
- Envanter bölümü: Sahip olunan eşya ve ödüllerin listesi
- Her ödülün altın maliyeti belirlenir

## 5. Ceza ve Kayıp Sistemi
- Kaçırılan görevler → XP kaybı, altın azalması
- Üst üste kaçırma → Rank düşüşü riski
- HP sistemi: Eylemsizlik = can kaybı, görev tamamlama = iyileşme
- Görsel uyarılar ve tehlike bildirimleri

## 6. İstatistik ve Görselleştirme
- Isı haritası (Heat Map) ile günlük alışkanlık takibi
- Recharts ile ilerleme grafikleri (haftalık/aylık XP, stat gelişimi)
- Genel performans özeti ve başarı rozetleri

## 7. Teknik Yaklaşım
- **Veri saklama**: İlk aşamada localStorage ile çalışacak (ileride hesap sistemi eklenebilir)
- **Tasarım**: Koyu arka plan, mavi-mor neon efektler, animasyonlu UI elemanları
- **Navigasyon**: Sol sidebar ile Dashboard, Görevler, Beceri Ağacı, Pazar Yeri, İstatistikler sayfaları

