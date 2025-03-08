import * as path from 'path';

export interface TemplatePosition {
  scale?: number;
  fontSize: number;
  fullName: {
    x: number;
    y: number;
    center?: boolean;
    scale?: number;
  };
  name?: {
    x: number;
    y: number;
    center?: boolean;
    scale?: number;
  };
  issued: {
    x: number;
    y: number;
    center?: boolean;
    fontSize?: number;
    i?: boolean;
    scale?: number;
  };
  expires: {
    x: number;
    y: number;
    center?: boolean;
    fontSize?: number;
    i?: boolean;
    scale?: number;
  };
  instructorId: {
    x: number;
    y: number;
    center?: boolean;
  };
  instructorName: {
    x: number;
    y: number;
    center?: boolean;
  };
  TrainingCenterName: {
    x: number;
    y: number;
    center?: boolean;
  };
  TrainingCenterId: {
    x: number;
    y: number;
    center?: boolean;
  };
  eCardCode: {
    x: number;
    y: number;
    center?: boolean;
    fontSize?: number;
  };
  city: {
    x: number;
    y: number;
    center?: boolean;
  };
  training_site_name: {
    fontSize: number;
    x: number;
    y: number;
    center?: boolean;
  };
  qrCode: {
    w?: number;
    h?: number;
    x: number;
    y: number;
  };
}

export interface TemplateData {
  image_cert?: string;
  image_id: string;
  fit?: boolean;
  settings: number;
  id_card: TemplatePosition;
  cert_card?: TemplatePosition;
}
export const Template_1: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-1.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 1,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      y: 305,
      fontSize: 12,

      center: true,
    },
  },
};
export const Template_2: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-2.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 2,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      y: 305,
      fontSize: 12,
      center: true,
    },
  },
};
export const Template_3: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-3.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 3,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
export const Template_4: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-4.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 4,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
export const Template_5: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-5.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 5,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 24,
    fullName: {
      x: 150,
      y: 940,
      scale: 2.0,
      center: false,
    },
    issued: {
      x: 350,
      y: 852,
    },
    expires: {
      x: 346,
      y: 822,
    },
    eCardCode: {
      x: 350,
      y: 794,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 350,
      y: 764,
    },
    instructorId: {
      x: 350,
      y: 880,
    },

    qrCode: {
      x: 700 - 25,
      y: 800 - 25,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
export const Template_6: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-6.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 6,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 24,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 350,
      y: 852,
    },
    expires: {
      x: 346,
      y: 822,
    },
    eCardCode: {
      x: 350,
      y: 794,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 350,
      y: 764,
    },
    instructorId: {
      x: 350,
      y: 880,
    },

    qrCode: {
      x: 700 - 25,
      y: 800 - 25,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
export const Template_7: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-7.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 7,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      y: 305,
      fontSize: 12,

      center: true,
    },
  },
};
export const Template_8: TemplateData = {
  image_cert: path.resolve('./views/templates/v3/2.jpg'),
  image_id: path.resolve('./views/templates/v3/2-id.jpg'),
  settings: 7,

  id_card: {
    fontSize: 13,
    scale: 1,
    fullName: {
      x: 352,
      y: 411,
      scale: 2,
      center: true,
    },
    issued: {
      x: 738,
      y: 260,
      i: true,
    },
    expires: {
      x: 952,
      y: 260,
      i: true,
    },
    instructorId: {
      x: 99999,
      y: 99999,
    },
    name: {
      x: 99999,
      y: 99999,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 99999,
      y: 99999,
    },
    TrainingCenterName: {
      x: 99999,
      y: 99999,
    },
    TrainingCenterId: {
      x: 736,
      y: 207,
    },
    eCardCode: {
      x: 99999,
      y: 99999,
    },
    city: {
      x: 99999,
      y: 99999,
    },
    training_site_name: {
      x: 99999,
      fontSize: 12,
      y: 99999,
    },
    qrCode: {
      x: 99999,
      y: 99999,
      w: 200,
      h: 200,
    },
  },

  cert_card: {
    fontSize: 23,
    scale: 1,
    fullName: {
      x: 572,
      y: 563,
      scale: 3.5,
      center: true,
    },
    issued: {
      x: 158,
      y: 347,
      i: true,
    },
    expires: {
      x: 99999,
      y: 346,
      i: true,
    },
    instructorId: {
      x: 99999,
      y: 99999,
    },
    name: {
      x: 99999,
      y: 99999,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 302,
      y: 211,
    },
    TrainingCenterName: {
      x: 349,
      y: 75,
    },
    TrainingCenterId: {
      x: 99999,
      y: 99999,
    },
    eCardCode: {
      x: 99999,
      y: 99999,
    },
    city: {
      x: 99999,
      y: 99999,
    },
    training_site_name: {
      x: 730,
      fontSize: 23,
      y: 340,
    },
    qrCode: {
      x: 99999,
      y: 99999,
      w: 200,
      h: 200,
    },
  },
};

export const Template_9: TemplateData = {
  image_cert: path.resolve('./views/templates/v3/1.png'),
  image_id: path.resolve('./views/templates/v3/1-id.png'),
  settings: 7,

  cert_card: {
    fontSize: 35,
    scale: 1,
    fullName: {
      x: 1221,
      y: 1514,
      scale: 3.5,
      center: true,
    },
    issued: {
      x: 665,
      y: 635,
      i: true,
    },
    expires: {
      x: 1707,
      y: 632,
      i: true,
    },
    instructorId: {
      x: 99999,
      y: 99999,
    },
    name: {
      x: 99999,
      y: 99999,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 99999,
      y: 99999,
    },
    TrainingCenterName: {
      x: 99999,
      y: 99999,
    },
    TrainingCenterId: {
      x: 99999,
      y: 99999,
    },
    eCardCode: {
      x: 99999,
      y: 99999,
    },
    city: {
      x: 99999,
      y: 99999,
    },
    training_site_name: {
      x: 99999,
      fontSize: 12,
      y: 99999,
    },
    qrCode: {
      x: 99999,
      y: 99999,
      w: 200,
      h: 200,
    },
  },
  id_card: {
    scale: 1,
    fontSize: 30,
    fullName: {
      x: 1787,
      y: 1239,
      scale: 1.5,
      center: true,
    },
    issued: {
      x: 1556,
      y: 748,
      i: false,
    },
    expires: {
      x: 2060,
      y: 748,
      i: false,
    },
    instructorId: {
      x: 2572,
      y: 27,
    },
    name: {
      x: 99999,
      y: 99999,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 99999,
      y: 99999,
    },
    TrainingCenterName: {
      x: 99999,
      y: 99999,
    },
    TrainingCenterId: {
      x: 1986,
      y: 715,
    },
    eCardCode: {
      x: 99999,
      y: 99999,
    },
    city: {
      x: 99999,
      y: 99999,
    },
    training_site_name: {
      x: 99999,
      fontSize: 12,
      y: 99999,
    },
    qrCode: {
      x: 99999,
      y: 99999,
      w: 200,
      h: 200,
    },
  },
};
