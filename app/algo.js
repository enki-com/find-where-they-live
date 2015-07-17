import Clustering from 'density-clustering';
const dbscan = new Clustering.DBSCAN();

function findLocationFromMedias(medias) {
  if (!medias || medias.length === 0) {
    throw new Error('no medias with location');
  }
  const locations = medias.filter((media) => media.location.latitude).map((media) => {
    return [parseFloat(media.location.latitude), parseFloat(media.location.longitude)];
  });
  if (locations.length === 0) {
    throw new Error('no medias with latitude');
  }

  const clusters = dbscan.run(locations, 0.0003, 2);
  const biggestCluster = clusters.sort((cluster1, cluster2) => {
    return cluster2.length - cluster1.length;
  })[0];

  if (!biggestCluster) {
    throw new Error('no cluster');
  }

  const clusterLocations = locations.filter((location, i) => {
    return biggestCluster.indexOf(i) !== -1;
  });

  let euclideanMean = clusterLocations.reduce((mean, location) => {
    return [
      mean[0] + location[0],
      mean[1] + location[1]
    ];
  }, [0, 0]);
  euclideanMean = [
    euclideanMean[0] / clusterLocations.length,
    euclideanMean[1] / clusterLocations.length
  ];
  console.log(clusters);
  console.log('euclideanMean:', euclideanMean);
  return euclideanMean;
}

export default {
  findLocationFromMedias
};
