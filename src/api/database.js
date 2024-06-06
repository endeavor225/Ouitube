import { EsperoDB } from 'esperodb';

const dataStructure = [
    {
      'videos': [
        { 
            indexes: [
              { 'slug': { unique: true }},
              { 'category': { unique: false }}
            ], 
            primaryKey: '_id' 
        },
      ],
    }
  ];

export  const db = new EsperoDB('ouitube', dataStructure, 1);