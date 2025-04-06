export const CONFIG = {
  defaultCenter: [50.0912, 14.4724],
  defaultZoom: 15,
  defaultLayerId: 3,
  minZoom: 0,
  maxZoom: 14,
  serviceUrl: 'https://gs-pub.praha.eu/arcgis/rest/services/ort/ortofotomapa_archiv/MapServer',
  crs: {
    code: 'EPSG:5514',
    def: '+proj=krovak +lat_0=49.5 +lon_0=24.8333333333333 +alpha=30.28814 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +units=m +no_defs',
    origin: [-951499.9999999999, -1199999.9999999998],
    resolutions: [
      1322.9193125052918, 661.4596562526459, 330.72982812632296,
      264.5838625010584, 198.43789687579378, 132.29193125052918,
      66.14596562526459, 39.687579375158754, 26.458386250105838,
      13.229193125052919, 6.6145965625264595, 3.9687579375158754,
      2.6458386250105837, 1.3229193125052918, 0.6614596562526459
    ],
    bounds: [[-2000000, -2000000], [2000000, 2000000]]
  },
  markers: [
    {
      lat: 50.09164,
      lng: 14.48494,
      title: 'Kino Jarov (19xx - 196x)',
      image: 'https://www.kauza3.cz/obrazek.php?id=519-15-6-2015.jpeg'
    }
  ]
};

