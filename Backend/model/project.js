const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
        unique: true,
    },
    description:{
        type:String,
        required:true
    },
    startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    status:{
        type:String,
        enum:['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default:'Pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async function(userIds) {
              const users = await mongoose.model('User').find({ '_id': { $in: userIds } });
              return users.every(user => ['Manager', 'Developer', 'Intern', 'Tester'].includes(user.role));
            },
            message: 'Projects can only be assigned to Managers, Developers, Interns, or Testers.',
          },
      }],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      }
});
projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

module.exports = mongoose.model('Project', projectSchema);